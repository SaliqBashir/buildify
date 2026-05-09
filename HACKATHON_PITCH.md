# import.me
## AI-Powered B2B Supplier Intelligence Platform
### Hackathon Pitch · 48 Hours, 14 Hours Coding · Team Rocket

---

## The Opening

> *"A supply chain manager spends 3 months finding a manufacturer. A designer spends weeks verifying if a supplier is real. A business development team wastes 40% of its time on manual research that never scales. When that supplier relationship finally forms, 70–85% of the value goes to middlemen and brokers. The manufacturer—the one doing the actual work—takes home 15–30%.*
>
> *This is not a failure of effort. This is a failure of discovery infrastructure."*

---

## 1. The One-Sentence Pitch

**import.me** is an AI-powered B2B supplier intelligence platform that transforms supply chain discovery from a 3-month manual research process into a real-time, semantically intelligent experience—turning unstructured supplier data into trustworthy, ranked supplier matches in seconds.

---

## 2. The USP Nobody Else Can Copy

### The Reframe That Wins The Room

Every existing solution in this space does one thing: create a marketplace, a directory, or a search index. We do something fundamentally different: we make **tacit supply chain knowledge queryable**.

**What's the difference?**

- Alibaba is a marketplace. → *Flooded with low-quality suppliers, no real verification.*
- Supplier databases are static. → *Outdated within weeks, expensive manual updates.*
- LinkedIn sourcing is social. → *Relies on personal networks, doesn't scale.*
- Google is text search. → *"Steel supplier in Turkey" returns 50,000 irrelevant results.*

**import.me is something else entirely: semantic supply chain intelligence.**

When a buyer says:
> *"I need a textile manufacturer in Pakistan who specializes in technical fabrics, uses sustainable dyes, and can handle 500-piece orders"*

We don't return a list. We:
1. **Parse intent semantically** via Google Gemini NLP
2. **Extract live supplier data** via Apify web scraping (real websites, real data)
3. **Rank by relevance** using vector embeddings and cosine similarity
4. **Score supplier quality** based on extracted metrics
5. **Surface contacts** (emails, phone numbers, key decision-makers)
6. **Verify geographically** and display on an interactive map
7. **Deliver a ranked, annotated list** in < 10 seconds

This is not a better search. This is a category nobody owns: **real-time supplier intelligence powered by AI and live web data.**

### Five Things This Framing Gives Us That A Marketplace Cannot

1. **Verification through action, not trust.** We verify suppliers by scraping their own websites, extracting their technical capabilities, confirming their contact infrastructure. No fake profiles—we show what actually exists.

2. **Speed as a defensible moat.** Every hour spent by a buyer on manual supplier research is an hour a competitor is spending too. We compress 3 months into seconds. That time advantage doesn't go away.

3. **Quality ranking nobody else has.** A buyer doesn't need 50 suppliers. They need the 3 that match their specific requirements. Our semantic scoring + supplier metrics do this automatically.

4. **Live data advantage.** Supplier databases get stale. We re-scrape in real-time. Our data is always fresher than any indexed directory.

5. **Dignity for the buyer.** "Search for suppliers on a marketplace" means wading through thousands of listings. "Get a ranked, verified list of suppliers in your exact category" is professional procurement. We're building the latter.

---

## 3. The Problem, Stated Plainly

### The Four Facts That Frame This Hackathon

**1. Supplier discovery is broken for 95% of small and medium manufacturers.**
- Average time to find a qualified supplier: **2–3 months**
- Average time spent on manual research: **40% of sourcing workflow**
- Supplier databases update once per quarter at best
- Results are flooded with irrelevant, unverified, or dormant suppliers

**2. Existing tools were built before AI made semantic search possible.**
- Google search doesn't understand supply chain intent ("technical fabrics" ≠ keyword match)
- LinkedIn is a network, not a discovery tool
- Alibaba is a marketplace optimized for wholesale conversion, not informed buyer decisions
- GI Tags and industry certifications are categorical, not semantic

**3. Real supplier data lives on thousands of fragmented websites and directories.**
- No centralized, queryable index of live supplier capabilities
- Contact information is scattered, outdated, or hidden behind forms
- Geospatial sourcing decisions require manual map research
- Supplier quality signals (certifications, past clients, production capacity) are unstructured

**4. The buyer-supplier relationship is still dominated by middlemen.**
- Bulk of buyer-supplier contact happens through brokers, agents, and trading companies
- Direct manufacturer relationships are rare, difficult to establish, and time-consuming
- Young manufacturers often don't have direct sales infrastructure
- Small buyers can't afford to source directly—middleman fees become unavoidable

---

## 4. Why Existing Platforms Cannot Solve This

| Platform | What It Does | Why It Fails the Buyer |
|----------|--------------|------------------------|
| **Google / Bing** | Full-text search across the web | Doesn't understand supply chain intent; returns marketing fluff, not verified capabilities |
| **Alibaba / Made-in-China** | Marketplace aggregation | Flooded with low-quality suppliers; no verification mechanism; takes 70–85% margin |
| **LinkedIn** | Professional network | Requires existing connections; doesn't scale for cold outreach; no supplier verification |
| **Industry Directories** | Static, manually-curated lists | Updated quarterly at best; no semantic search; no contact extraction; no real-time data |
| **ERP Vendor Modules** | Embedded procurement tools | Locked into proprietary data; requires enterprise contracts; no AI reasoning |
| **ChatGPT / General AI** | General knowledge Q&A | No live data access; hallucinates supplier info; can't verify claims; not built for supply chain |

**None of these combine three things we do:**
1. Real-time, live supplier data (scraped, verified, current)
2. Semantic understanding of supply chain requirements
3. Automated ranking + contact extraction in seconds

---

## 5. The Solution: import.me's Three Layers

We deliberately structured import.me into three layers, each one feeding the next. Layer 1 transforms the data. Layers 2–3 deliver actionable intelligence.

```
┌─────────────────────────────────────────────────────────┐
│                                                           │
│  Layer 1: INTELLIGENCE ENGINE                           │
│  Transform unstructured web data into queryable supplier │
│  profiles via AI extraction, semantic ranking            │
│                                                           │
└──────────────────────────────┬──────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────┐
│                                                           │
│  Layer 2: DISCOVERY & RANKING                           │
│  Semantic search, live filtering, quality scoring,      │
│  contact extraction, geospatial visualization           │
│                                                           │
└──────────────────────────────┬──────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────┐
│                                                           │
│  Layer 3: COMPARISON & ACTION                           │
│  Side-by-side analytics, metrics dashboard,             │
│  contact outreach interface, exportable reports         │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### Layer 1: The Intelligence Engine

**Purpose:** Take raw web data about suppliers and convert it into structured, queryable supplier profiles with AI-extracted capabilities.

**How it works:**
1. **Web Intelligence via Apify.** Real-time scraping of supplier websites, directories, and public databases. Not cached data—live, refreshed profiles.
2. **AI Extraction via Google Gemini.** NLP-powered extraction of:
   - Company capabilities (what they manufacture, materials, capacity)
   - Production specs (minimum orders, lead times, certifications)
   - Contact information (emails, phone numbers, key contacts)
   - Quality signals (client logos, certifications, past work samples)
3. **Data Normalization.** Standardize supplier data into a queryable schema: company name, capabilities, location, contacts, certifications, production capacity.
4. **Semantic Embeddings.** Convert supplier profiles + buyer queries into vector embeddings for similarity-based ranking.

**Deliverable:** A normalized, queryable supplier database that's always fresh and always linked to original source URLs.

---

### Layer 2: Discovery & Ranking

**Purpose:** Take a buyer's natural-language query and return the most relevant suppliers, ranked by fit.

**How it works:**
1. **Natural Language Query.** Buyer describes what they need in plain English (or other languages):
   > *"I need a textile manufacturer in Pakistan who specializes in technical fabrics and can handle bulk orders"*

2. **Semantic Understanding via Gemini.** LLM parses intent:
   - Category: textile manufacturing
   - Specialty: technical fabrics
   - Geography: Pakistan
   - Minimum order: bulk scale
   - Other constraints: quality, certifications, lead time

3. **Live Filtering.** Query the scraped supplier database for matches.
4. **Semantic Ranking.** Use vector embeddings + cosine similarity to rank suppliers by relevance to the specific query.
5. **Quality Scoring.** Apply proprietary scoring algorithm based on:
   - Certification level
   - Production capacity vs. order size
   - Contact availability
   - Data freshness
6. **Geospatial Visualization.** Display matched suppliers on interactive Leaflet map by location.

**Deliverable:** A ranked, annotated list of 5–20 verified suppliers, each with extracted contacts, metrics, and location.

---

### Layer 3: Comparison & Action

**Purpose:** Give the buyer tools to evaluate, compare, and reach out to suppliers directly.

**How it works:**
1. **Side-by-Side Comparison.** View supplier profiles in a comparison table:
   - Production capacity, certifications, minimum orders, lead times
   - Contact information extracted and deduplicated
   - Scoring breakdown (why this supplier ranked higher)

2. **Metrics Dashboard.** Real-time analytics:
   - Average lead time for category
   - Typical minimum order quantities
   - Certification prevalence
   - Geographic distribution of matches

3. **Contact Extraction & Validation.** Every matched supplier shows:
   - Email addresses (deduped, verified format)
   - Phone numbers with country codes
   - Key contact names and titles (when available)
   - LinkedIn/social profiles

4. **Outreach Interface.** Direct messaging / email draft pre-populated with:
   - Buyer's requirements (what the supplier matched)
   - Relevant questions based on supplier's capabilities
   - Polite outreach template in multiple languages

**Deliverable:** A professional comparison interface where a buyer can make an informed decision and reach out to pre-verified suppliers in < 2 minutes.

---

## 6. The Flywheel

Why the three layers form a single, self-reinforcing system:

**Intelligence Engine** creates normalized, queryable supplier data from the chaos of the live web.

**Discovery & Ranking** turns that data into actionable intelligence—the right suppliers for the right buyer, ranked by fit.

**Comparison & Action** closes the loop—the buyer doesn't just see suppliers, they can verify and contact them directly.

The result: **A buyer goes from "I need a supplier" → "Here are your 5 best matches with contact info" in <10 seconds.**

Every use of import.me makes the supplier database more complete, more accurate, and more fresh. Every scrape brings new data. Every query trains the ranking model. The system gets better with use.

---

## 7. Hackathon Scope — What We Actually Built & Will Demo

import.me was built in a **48-hour hackathon with 14 hours of actual coding.** We did not build all three layers at production scale. We built **one vertical slice, end-to-end**, that demonstrates the complete workflow.

### The 10-Minute Live Demo Flow

**Setup:** The jury will see a real or carefully staged query for textile suppliers in a specific geography.

**Flow:**

1. **[1 min] The Query.** 
   - Buyer enters: *"I need a textile supplier in Pakistan who does technical fabrics, minimum 500 units"*
   - System processes the query in real-time

2. **[2 min] AI Extraction & Ranking.**
   - Gemini understands the intent (location, category, volume)
   - System queries live scraped supplier database
   - Semantic ranking algorithm produces ranked list
   - On-screen: ranked supplier list appears with scores

3. **[2 min] Contact Extraction & Geospatial View.**
   - Matched suppliers displayed on interactive map
   - Extracted contacts (emails, phone numbers) shown alongside profiles
   - Scoring breakdown for top 3 suppliers visible

4. **[2 min] Comparison Interface.**
   - Side-by-side table: capacity, certifications, lead times, pricing
   - Metrics dashboard: average lead time, typical MOQs, certification prevalence
   - All data verified and sourced from live web scraping

5. **[2 min] Contact Outreach.**
   - Pre-populated draft email to selected supplier
   - One-click contact action
   - Buyer walks away with 5 verified supplier contacts and decision rationale

6. **[1 min] Close on the System.**
   - *"One query. One semantic ranking. One interface. Seconds instead of months."*

---

## 8. Build-or-Die Hackathon Deliverables

| Deliverable | What "Done" Looks Like |
|-------------|------------------------|
| **NLP Query Parser** | Gemini-powered intent extraction from natural-language supplier requests |
| **Web Scraping Pipeline** | Apify-based data extraction from live supplier websites; normalized schema |
| **Semantic Ranking Engine** | Vector embeddings + cosine similarity ranking of suppliers by relevance |
| **Contact Extraction Service** | Automatic email/phone/contact extraction from scraped profiles |
| **Geospatial Mapping UI** | Leaflet-based interactive map showing supplier locations, filterable by category |
| **Comparison Interface** | Side-by-side supplier comparison table with extracted metrics and scoring |
| **Metrics Dashboard** | Real-time analytics on supplier data (avg lead times, MOQs, certifications) |
| **Demo Dataset** | Pre-scraped supplier profiles for 1–2 categories (e.g., textiles, manufacturing) with sample buyer query |

---

## 9. Technical Architecture

```
┌──────────────────────────────────────────────────────────┐
│                      FRONTEND                            │
│  Next.js 16 + React 19 + Tailwind + Leaflet             │
│  - Query input interface                                 │
│  - Results ranking display                               │
│  - Geospatial map visualization                          │
│  - Comparison tables & dashboards                        │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                    API GATEWAY                           │
│  Flask REST API + Google Gemini integration             │
│  - NLP query parsing                                     │
│  - Ranking orchestration                                 │
│  - Contact extraction                                    │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│              INTELLIGENCE SERVICES                       │
│  - Semantic search (embeddings + similarity)            │
│  - Supplier scoring algorithm                           │
│  - Supplier data normalization                          │
│  - Contact extraction & deduplication                   │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   DATA LAYER                             │
│  - Normalized supplier profiles (in-memory for demo)    │
│  - Vector embeddings (pgvector or similar)              │
│  - Raw scraping results cached                          │
│  - Apify integration for live scraping                  │
└──────────────────────────────────────────────────────────┘
```

### Tech Stack (Verified, Implemented)

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16.2.1, React 19.2.4, Tailwind CSS 4, Leaflet 1.9.4, React-Leaflet 5.0.0, Chart.js 4.5.1 |
| **Backend** | Python 3.11+, Flask, Google Generative AI SDK (Gemini), Pydantic 2.13.4 |
| **Scraping & Data** | Apify Client 2.22.3, BeautifulSoup4 4.14.3 |
| **AI & Embeddings** | Google Gemini API, Cosine similarity (numpy), Vector embeddings |
| **Geospatial** | Leaflet + React-Leaflet for map visualization |
| **Deployment** | Vercel (frontend), Flask dev server (backend) |

---

## 10. Team & Work Distribution

**Team Rocket — 5 People**

| Role | Person | Responsibility |
|------|--------|-----------------|
| **Lead Engineer** | Hammad Mustafa | Full-stack orchestration, semantic ranking, Gemini integration, demo engineering |
| **AI/ML Specialist** | Saliq Bashir | NLP queries, embedding generation, ranking algorithm tuning |
| **Backend Engineer** | Basit | Flask API, data normalization, Apify integration, contact extraction |
| **Frontend Developer** | Saalim | Next.js UI, geospatial mapping, comparison interface, metrics dashboard |
| **Product Manager** | Adnan Agha | Scope management, demo strategy, pitch narrative, user workflow design |

**Work Distribution (48 Hours, 14 Hours Coding):**

- **Hours 0–4:** Setup, architecture design, schema lock
- **Hours 4–9:** Vertical slice (query → ranking → results) without AI, with mock data
- **Hours 9–12:** Gemini integration, semantic ranking, live scraping
- **Hours 12–14:** Contact extraction, geospatial UI, comparison table
- **Hours 14–48:** (34 hours) Demo rehearsal, asset prep, presentation, sleep, meals

---

## 11. What Could Break & How We Protect Against It

| Risk | Likelihood | Mitigation |
|------|-----------|-----------|
| Gemini API rate limiting during demo | Medium | Pre-cached query results, fallback to mock inference |
| Apify scraping returns incomplete data | Medium | Demo dataset is pre-scraped and verified before demo day |
| Next.js build fails on stage | Low | Local build artifacts cached; single command deploy tested 3× |
| Geospatial map doesn't load | Low | Static map image as fallback; all demo data local |
| Contact extraction has parsing errors | Medium | Manual validation of extracted emails before demo; display confidence scores |
| No internet on stage | High | **All demo assets cached locally—API calls return pre-recorded responses** |

**Demo-Day Readiness:**
- Entire demo runs offline with pre-recorded Gemini responses
- All supplier data and rankings pre-computed
- Map tiles cached locally
- Zero external dependencies for the 10-minute pitch

---

## 12. Out of Scope for the Hackathon

- Native mobile apps (web is responsive; apps are post-hack)
- Multi-category scaling (demo focuses on 1–2 verticals)
- Machine learning model retraining (ranking is deterministic for demo)
- Real payment/booking integration (not a commerce tool yet)
- Production compliance, SOC2, data privacy frameworks (planned post-hack)
- White-label marketplace (single-buyer demo interface)

---

## 13. Why This Matters Now

**1. Supply chain has no AI discovery tool.**
- ChatGPT doesn't verify suppliers
- Google can't rank suppliers semantically
- Existing B2B platforms are marketplaces, not intelligence systems

**2. Web scraping + LLMs have just become feasible together.**
- Apify makes real-time web data accessible and affordable
- Gemini makes semantic extraction reliable and fast
- Vector embeddings make supplier matching scientifically defensible

**3. Small manufacturers are isolated.**
- They lack sales infrastructure to reach qualified buyers
- Direct B2B discovery channels don't exist at scale
- Middlemen still take 70–85% of value

**4. Buyers are desperate for speed.**
- 3 months per supplier relationship is unacceptable in modern supply chains
- Manual research is the bottleneck, not availability of suppliers

---

## 14. What We're Asking For

**From the hackathon judges:**
1. Recognition that real-time supplier intelligence is a new category
2. Acknowledgment that this works (we're demoing a complete workflow)
3. Validation that the problem is worth solving

**Beyond the hackathon:**
- Mentorship on go-to-market (which buyers to reach out to first)
- Technical introductions to 3–5 supply chain decision-makers
- Guidance on B2B SaaS positioning

**The goal:** If we win, import.me becomes a tool that lets a buyer find 5 verified suppliers in seconds instead of 3 months. We're not looking to build a marketplace. We're looking to own the discovery layer.

---

## 15. Closing — Sixty-Second Jury Pitch

**Problem:** Supplier discovery takes 2–3 months, requires 40% of sourcing workflow in manual research, and is flooded with unverified or outdated data. Middlemen extract 70–85% of value. Direct manufacturer relationships are impossible to establish at scale.

**Solution:** **import.me** — AI-powered supplier intelligence that combines:
- **Real-time web scraping** (Apify) for live supplier data
- **Semantic NLP** (Google Gemini) for intent understanding
- **Vector embeddings** for relevance ranking
- **Contact extraction** for direct outreach
- **Geospatial visualization** for location-based decisions

Transform a 3-month search into a 10-second ranked list with verified contacts.

**Economics:** A buyer saves 40% of sourcing time. A manufacturer gains direct access to qualified buyers without middlemen. Both win.

**Moat:** Every supplier we scrape, every query we rank, every buyer we serve makes the system better. Real-time data is our unfair advantage.

**Ask:** Help us prove that AI-powered supplier discovery is the future of B2B procurement.

---

## The Hand Still Reaching for Better Suppliers

> *"Right now, somewhere in Southeast Asia, a textile manufacturer has the exact capacity, quality, and certification a buyer needs—but they'll never meet because discovery infrastructure broke down somewhere in 1995 and nobody fixed it.*
>
> *import.me fixes it. In 14 hours of a 48-hour hackathon, we proved the concept works.*
>
> *Now we're asking to build it."*

---

**import.me**  
*AI-Powered B2B Supplier Intelligence*  
*Team Rocket | NIT Srinagar Hackathon 2025*  
*Built in 48 hours. 14 hours of coding. Zero compromises.*
