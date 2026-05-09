import os
import logging
import torch
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from bs4 import BeautifulSoup
from gnews import GNews
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline
from sentence_transformers import SentenceTransformer, util

# --- SYSTEM SETUP ---
os.environ["TOKENIZERS_PARALLELISM"] = "false"
logging.getLogger("transformers").setLevel(logging.ERROR)

app = Flask(__name__)
CORS(app) # Enable CORS for frontend integration

# --- GLOBAL AI INITIALIZATION (M4 Optimized) ---
print("🚀 Initializing M4 Silicon Dual-Engine...")
device = "mps" if torch.backends.mps.is_available() else "cpu"

# Engine 1: Sentiment & Risk Analysis (FinBERT)
tokenizer = AutoTokenizer.from_pretrained("ProsusAI/finbert")
sentiment_model = AutoModelForSequenceClassification.from_pretrained("ProsusAI/finbert").to(device)
nlp_sentiment = pipeline("sentiment-analysis", model=sentiment_model, tokenizer=tokenizer, device=device)

# Engine 2: Semantic Similarity for Alternatives (MiniLM)
similarity_model = SentenceTransformer('all-MiniLM-L6-v2', device=device)

# --- KNOWLEDGE BASE ---
MATERIAL_LOGIC = {
    "copper": ["Aluminium (Al) 1350", "PEX-B", "Stainless Steel 316L", "Silver (Ag)"],
    "rice": ["Sorghum (Milo)", "Pearl Millet (Bajra)", "Cassava-based Analog Rice", "Broken Maize"],
    "steel": ["Aluminum 6061", "Carbon Fiber Composite", "Titanium Grade 5"],
    "cotton": ["Polyester", "Recycled PET Fiber", "Bamboo Fiber", "Hemp"],
    "plastic": ["Bioplastic PLA", "Recycled HDPE", "Mycelium Composite"],
    "aluminum": ["Magnesium Alloy", "Carbon Fiber Reinforced Polymer", "Titanium Grade 2"]
}

# --- HELPER FUNCTIONS ---

def build_query(commodity, region):
    keywords = ["supply chain", "shortage", "conflict", "export ban", "tariff", "disruption"]
    joined_keywords = " OR ".join([f'"{kw}"' for kw in keywords])
    return f'"{commodity}" AND ({joined_keywords}) AND "{region}"'

def fetch_web_alternatives(target_material):
    search_query = f"industrial {target_material} supply chain substitutes alternatives grades"
    headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36..."}
    
    web_candidates = []
    try:
        search_url = f"https://www.bing.com/search?q={search_query.replace(' ', '+')}"
        response = requests.get(search_url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, "html.parser")
        
        for tag in soup.find_all(["p", "li", "span"], limit=80):
            text = tag.get_text(strip=True)
            if 8 < len(text) < 90 and not any(n in text.lower() for n in ["bing", "microsoft", "sign in"]):
                web_candidates.append(text)
    except Exception as e:
        print(f"Web fetch error: {e}")
    
    kb_options = MATERIAL_LOGIC.get(target_material.lower(), [])
    combined = list(set(web_candidates + kb_options))
    return combined, kb_options

# --- API ROUTES ---

@app.route("/api/analyze-commodity", methods=["POST"])
def analyze_commodity():
    """Analyzes geopolitical risk and sentiment for a specific commodity/region."""
    data = request.json
    commodity = data.get("commodity")
    region = data.get("region")

    if not commodity or not region:
        return jsonify({"error": "Missing commodity or region"}), 400

    gn = GNews(language="en", period="14d", max_results=20)
    query = build_query(commodity, region)
    articles = gn.get_news(query)

    if not articles:
        return jsonify({"message": "No relevant geopolitical news found."}), 404

    headlines = [a["title"] for a in articles]
    results = nlp_sentiment(headlines)

    weighted_neg, weighted_pos, total_conf, ignored = 0.0, 0.0, 0.0, 0
    for res in results:
        if res["score"] < 0.65:
            ignored += 1
            continue
        if res["label"] == "negative":
            weighted_neg += res["score"]
            total_conf += res["score"]
        elif res["label"] == "positive":
            weighted_pos += res["score"]
            total_conf += res["score"]

    buy_risk = (weighted_neg / total_conf * 100) if total_conf > 0 else 0
    sell_pressure = (weighted_pos / total_conf * 100) if total_conf > 0 else 0

    return jsonify({
        "metadata": {"commodity": commodity, "region": region, "signals_analyzed": len(headlines)},
        "risk_scores": {"buy_risk": f"{buy_risk:.1f}%", "sell_pressure": f"{sell_pressure:.1f}%"},
        "strategy": "Stockpile" if buy_risk > 60 else "Neutral",
        "top_news": headlines[:3]
    })

@app.route('/api/alternatives/<material>', methods=['GET'])
def get_alternatives(material):
    """Fetches and ranks industrial substitutes using semantic similarity."""
    try:
        all_options, kb_options = fetch_web_alternatives(material)
        if not all_options:
            return jsonify({"error": "No materials found"}), 404

        all_embeddings = similarity_model.encode(all_options, convert_to_tensor=True)
        query_embedding = similarity_model.encode(material, convert_to_tensor=True)
        hits = util.semantic_search(query_embedding, all_embeddings, top_k=10)[0]

        results = []
        for hit in hits:
            if hit['score'] > 0.30:
                name = all_options[hit['corpus_id']]
                results.append({
                    "name": name,
                    "score": round(float(hit['score']), 2),
                    "is_kb_verified": name in kb_options
                })

        return jsonify({
            "material": material,
            "alternatives": results
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Using threaded=False for MPS stability with PyTorch pipelines
    app.run(port=5001, debug=True, threaded=False)
