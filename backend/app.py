"""
app.py – Buildify Backend (M4 Silicon Dual‑Engine + Gemini Alternatives)
Migrated to google-genai SDK (2026)
"""

import os
import logging
import json
import torch
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# --- NEW Gemini SDK ---
from google import genai
from google.genai import types

# --- Your existing NLP / crawling imports (unchanged) ---
from bs4 import BeautifulSoup
from gnews import GNews
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline
from sentence_transformers import SentenceTransformer, util

# ================== SYSTEM SETUP ==================
load_dotenv()  # loads GEMINI_API_KEY from .env

# New Gemini client (automatically reads GEMINI_API_KEY from environment)
genai_client = genai.Client()

os.environ["TOKENIZERS_PARALLELISM"] = "false"
logging.getLogger("transformers").setLevel(logging.ERROR)

# Device selection for PyTorch models (unchanged)
device = "mps" if torch.backends.mps.is_available() else "cpu"
print(f"Using device: {device}")

# --- Engine 1: Sentiment & Risk Analysis (FinBERT) (unchanged) ---
tokenizer = AutoTokenizer.from_pretrained("ProsusAI/finbert")
sentiment_model = AutoModelForSequenceClassification.from_pretrained(
    "ProsusAI/finbert"
).to(device)
nlp_sentiment = pipeline(
    "sentiment-analysis", model=sentiment_model, tokenizer=tokenizer, device=device
)

# --- Engine 2: Semantic Similarity (MiniLM) – still loaded for potential future use ---
similarity_model = SentenceTransformer("all-MiniLM-L6-v2", device=device)


# ================== HELPER FUNCTIONS (unchanged) ==================
def build_query(commodity, region):
    keywords = [
        "supply chain",
        "shortage",
        "conflict",
        "export ban",
        "tariff",
        "disruption",
    ]
    joined_keywords = " OR ".join([f'"{kw}"' for kw in keywords])
    return f'"{commodity}" AND ({joined_keywords}) AND "{region}"'


# ================== FLASK APP ==================
app = Flask(__name__)
CORS(app)


# ================== ROUTE: analyze-commodity (unchanged) ==================
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

    if buy_risk > 60:
        strategy = "Stockpile (Buy)"
        reason = "High supply chain risks detected. Recommend stockpiling inventory to avoid future shortages."
    elif sell_pressure > 60:
        strategy = "Liquidate (Sell)"
        reason = "Favorable market conditions for selling. Consider liquidating excess inventory."
    else:
        strategy = "Hold (Neutral)"
        reason = "Market conditions are relatively stable. Maintain current inventory levels."

    return jsonify(
        {
            "metadata": {
                "commodity": commodity,
                "region": region,
                "signals_analyzed": len(headlines),
            },
            "risk_scores": {
                "buy_risk": f"{buy_risk:.1f}%",
                "sell_pressure": f"{sell_pressure:.1f}%",
            },
            "strategy": strategy,
            "strategy_reason": reason,
            "top_news": headlines[:3],
        }
    )


# ================== ROUTE: alternatives (NEW – Gemini powered) ==================
@app.route("/api/alternatives/<material>", methods=["GET"])
def get_alternatives(material):
    """
    Uses Gemini (gemini-2.5-flash) to return a list of alternative materials
    with savings, pros/cons, and supplier hints.
    """
    prompt = f"""
You are an industrial supply‑chain expert. A client wants to replace "{material}".
Suggest 3-5 realistic alternative materials or grades.
Output ONLY a JSON array (no markdown, no backticks). Each object must contain:
- name: string (the alternative material)
- match_score: int 0-100 (how close a substitute it is)
- savings_pct: int (negative means cheaper, positive means more expensive)
- pros: list of 2-3 strings (advantages)
- cons: list of 2-3 strings (disadvantages)
- sustainability: string ("Better", "Similar", "Worse")
- supplier_types: list of 2-3 strings (e.g., "Regional distributors", "Direct mills")
"""

    try:
        response = genai_client.models.generate_content(
            model="gemini-2.5-flash",  # latest fast model
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.1,  # low temperature for structured output
                response_mime_type="application/json",
            ),
        )

        raw = response.text.strip()

        # Clean potential markdown fences if Gemini still wraps the JSON
        if raw.startswith("```"):
            raw = raw.split("\n", 1)[1]
        if raw.endswith("```"):
            raw = raw.rsplit("\n", 1)[0]

        alternatives = json.loads(raw)

        if not isinstance(alternatives, list):
            raise ValueError("Gemini output is not a JSON array")

        return jsonify({"material": material, "alternatives": alternatives})

    except json.JSONDecodeError as e:
        logging.exception("Gemini returned invalid JSON")
        return jsonify({"error": f"Invalid JSON from AI: {str(e)}"}), 500
    except Exception as e:
        logging.exception("Gemini alternative generation failed")
        return jsonify({"error": f"AI generation error: {str(e)}"}), 500


# ================== RUN ==================
if __name__ == "__main__":
    # threaded=False avoids issues with PyTorch on MPS
    app.run(port=5001, debug=True, threaded=False)
