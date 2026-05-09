from flask import Flask, jsonify
from flask_cors import CORS
import asyncio
import requests
from bs4 import BeautifulSoup
from sentence_transformers import SentenceTransformer, util

app = Flask(__name__)
CORS(app)

# Initialize model once at startup for performance
model = SentenceTransformer('all-MiniLM-L6-v2')

# Knowledge Base for Industrial Logic
MATERIAL_LOGIC = {
    "copper": ["Aluminium (Al) 1350", "PEX-B", "Stainless Steel 316L", "Silver (Ag)"],
    "rice": ["Sorghum (Milo)", "Pearl Millet (Bajra)", "Cassava-based Analog Rice", "Broken Maize"],
    "steel": ["Aluminum 6061", "Carbon Fiber Composite", "Titanium Grade 5"],
    "cotton": ["Polyester", "Recycled PET Fiber", "Bamboo Fiber", "Hemp"],
    "plastic": ["Bioplastic PLA", "Recycled HDPE", "Mycelium Composite"],
    "aluminum": ["Magnesium Alloy", "Carbon Fiber Reinforced Polymer", "Titanium Grade 2"]
}

def fetch_web_alternatives(target_material):
    search_query = f"industrial {target_material} supply chain substitutes alternatives grades"
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    
    web_candidates = []
    try:
        search_url = f"https://www.bing.com/search?q={search_query.replace(' ', '+')}"
        response = requests.get(search_url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, "html.parser")
        
        # Extract text snippets from search result descriptions
        for tag in soup.find_all(["p", "li", "span"], limit=80):
            text = tag.get_text(strip=True)
            noise = ["bing", "microsoft", "sign in", "privacy", "settings", "feedback", "cookie", "©"]
            if 8 < len(text) < 90 and not any(n in text.lower() for n in noise):
                web_candidates.append(text)
    except Exception as e:
        print(f"Web fetch error: {e}")
    
    # Combine with Knowledge Base
    kb_options = MATERIAL_LOGIC.get(target_material.lower(), [])
    combined = list(set(web_candidates + kb_options))
    return combined, kb_options

@app.route('/api/alternatives/<material>', methods=['GET'])
def get_alternatives(material):
    try:
        all_options, kb_options = fetch_web_alternatives(material)

        if not all_options:
            return jsonify({"error": "No materials found"}), 404

        # AI Ranking via semantic similarity
        all_embeddings = model.encode(all_options, convert_to_tensor=True)
        query_embedding = model.encode(material, convert_to_tensor=True)
        hits = util.semantic_search(query_embedding, all_embeddings, top_k=10)[0]

        results = []
        for hit in hits:
            if hit['score'] > 0.30:
                name = all_options[hit['corpus_id']]
                results.append({
                    "name": name,
                    "score": round(float(hit['score']), 2),
                    "is_kb": name in kb_options
                })

        return jsonify({
            "material": material,
            "count": len(results),
            "alternatives": results
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000, threaded=True)
