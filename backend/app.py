from flask import Flask, jsonify, request
from flask_cors import CORS
import asyncio
from crawl4ai import AsyncWebCrawler
from sentence_transformers import SentenceTransformer, util

app = Flask(__name__)
# Enable CORS so the Next.js frontend can communicate with it
CORS(app)

# Initialize model once at startup for performance
model = SentenceTransformer('all-MiniLM-L6-v2')

# Knowledge Base for Industrial Logic
MATERIAL_LOGIC = {
    "copper": ["Aluminium (Al) 1350", "PEX-B", "Stainless Steel 316L", "Silver (Ag)"],
    "rice": ["Sorghum (Milo)", "Pearl Millet (Bajra)", "Cassava-based Analog Rice", "Broken Maize"],
    "steel": ["Aluminum 6061", "Carbon Fiber Composite", "Titanium Grade 5"]
}

async def fetch_web_alternatives(target_material):
    search_query = f"industrial {target_material} supply chain substitutes grades"
    search_url = f"https://www.google.com/search?q={search_query.replace(' ', '+')}&udm=28"

    async with AsyncWebCrawler() as crawler:
        result = await crawler.arun(url=search_url)
        content = result.markdown.raw_markdown if hasattr(result.markdown, 'raw_markdown') else str(result.markdown)
        raw_lines = content.split('\n')

        noise = ["google", "sign in", "privacy", "settings", "feedback", "images"]
        web_candidates = [
            line.strip() for line in raw_lines 
            if 8 < len(line.strip()) < 90 and not any(n in line.lower() for n in noise)
        ]
        
        # Combine with DB logic
        kb_options = MATERIAL_LOGIC.get(target_material.lower(), [])
        return list(set(web_candidates + kb_options))

@app.route('/api/alternatives/<material>', methods=['GET'])
def get_alternatives(material):
    try:
        # Run the async crawler inside the synchronous Flask route
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        all_options = loop.run_until_complete(fetch_web_alternatives(material))
        loop.close()

        if not all_options:
            return jsonify({"error": "No materials found"}), 404

        # AI Ranking
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
                    "is_kb": name in MATERIAL_LOGIC.get(material.lower(), [])
                })

        return jsonify({
            "material": material,
            "count": len(results),
            "alternatives": results
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Threaded mode is important for handling the async loop calls
    app.run(debug=True, port=5000, threaded=True)
