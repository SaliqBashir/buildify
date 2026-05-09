"use client";

import { useState, useEffect } from "react";
import { BsStars, BsShieldCheck } from "react-icons/bs";
import { FaChartLine, FaArrowUp, FaArrowDown, FaExclamationTriangle, FaBoxOpen } from "react-icons/fa";
import Navigation from "@/app/components/Navigation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Predictor() {
  const [mounted, setMounted] = useState(false);

  // Live Analysis State
  const [analysisCommodity, setAnalysisCommodity] = useState("");
  const [analysisRegion, setAnalysisRegion] = useState("");
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisError, setAnalysisError] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAnalyze = async () => {
    if (!analysisCommodity.trim() || !analysisRegion.trim()) return;
    setAnalysisLoading(true);
    setAnalysisError(null);
    setAnalysisResult(null);

    try {
      const response = await fetch("http://127.0.0.1:5001/api/analyze-commodity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commodity: analysisCommodity, region: analysisRegion })
      });

      if (!response.ok) {
        if (response.status === 404) {
           throw new Error("No relevant geopolitical news found for this commodity and region.");
        }
        throw new Error("Failed to analyze commodity risk.");
      }

      const data = await response.json();
      setAnalysisResult(data);
    } catch (err) {
      setAnalysisError(err.message);
    } finally {
      setAnalysisLoading(false);
    }
  };

  const predictions = [
    {
      id: 1,
      material: "Aluminum Extrusions",
      trend: "up",
      priceChange: "+8.5%",
      availability: "Low",
      recommendation: "Buy Now",
      urgency: "High",
      reason: "Global bauxite shortage expected next quarter. Securing inventory now avoids an estimated 12% price hike."
    },
    {
      id: 2,
      material: "Polypropylene Resins",
      trend: "down",
      priceChange: "-3.2%",
      availability: "High",
      recommendation: "Wait",
      urgency: "Low",
      reason: "Oversupply in Southeast Asian markets is driving prices down. Expected to bottom out in 6 weeks."
    },
    {
      id: 3,
      material: "Lithium Carbonate",
      trend: "up",
      priceChange: "+15.0%",
      availability: "Critical",
      recommendation: "Lock Contracts",
      urgency: "Critical",
      reason: "EV battery demand surging ahead of holiday manufacturing cycle. Supply chains are heavily bottlenecked."
    }
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Global Raw Material Price Index',
        data: [100, 105, 102, 115, 118, 125],
        fill: true,
        borderColor: '#818cf8',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#cbd5e1'
        }
      }
    },
    scales: {
      y: {
        grid: { color: '#334155' },
        ticks: { color: '#94a3b8' }
      },
      x: {
        grid: { color: '#334155' },
        ticks: { color: '#94a3b8' }
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-600 font-sans selection:bg-indigo-500/30 pb-24">
      <Navigation />

      <div className="max-w-7xl mx-auto p-6 space-y-8 mt-4">
        <div className="stripe-gradient border border-slate-200/50 rounded-2xl p-8 stripe-card-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-[#0a2540] mb-2 flex items-center gap-2">
                <FaChartLine className="text-indigo-600" /> AI Inventory Predictor
              </h2>
              <p className="text-slate-500 mb-6 max-w-2xl text-sm leading-relaxed">
                Stay ahead of global supply chain disruptions. Our AI analyzes global trends, price fluctuations, and availability to tell you exactly what to buy and when.
              </p>
              <div className="flex gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-4 flex-1">
                  <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Index Change (30d)</p>
                  <p className="text-2xl font-bold text-rose-400 flex items-center gap-2">
                    <FaArrowUp className="h-4 w-4" /> 4.2%
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-4 flex-1">
                  <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Disruption Risk</p>
                  <p className="text-2xl font-bold text-amber-400 flex items-center gap-2">
                    <FaExclamationTriangle className="h-4 w-4" /> Medium
                  </p>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 h-[300px] bg-white border border-slate-200 rounded-xl p-4 shadow-inner">
              {mounted && <Line data={chartData} options={chartOptions} />}
            </div>
          </div>
        </div>

        {/* Live Geopolitical Risk Analysis Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 stripe-card-shadow relative overflow-hidden">
          <div className="absolute top-0 left-0 -mt-20 -ml-20 w-72 h-72 bg-rose-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <h3 className="text-2xl font-bold text-[#0a2540] mb-2 flex items-center gap-2 relative z-10">
            <BsShieldCheck className="text-indigo-600" /> Live Geopolitical Risk Analysis
          </h3>
          <p className="text-slate-500 mb-6 text-sm relative z-10">
            Analyze real-time news and sentiment to determine supply chain risks for specific commodities and regions using FinBERT.
          </p>

          <div className="flex flex-col md:flex-row gap-4 relative z-10 mb-8">
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Commodity</label>
              <input
                type="text"
                value={analysisCommodity}
                onChange={(e) => setAnalysisCommodity(e.target.value)}
                placeholder="e.g. Lithium, Copper, Wheat"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none transition-colors text-[#0a2540] font-medium"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Region</label>
              <input
                type="text"
                value={analysisRegion}
                onChange={(e) => setAnalysisRegion(e.target.value)}
                placeholder="e.g. Asia, South America, Global"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none transition-colors text-[#0a2540] font-medium"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleAnalyze}
                disabled={analysisLoading || !analysisCommodity.trim() || !analysisRegion.trim()}
                className="px-8 py-3 bg-[#0a2540] text-white hover:bg-indigo-600 disabled:bg-slate-300 disabled:text-slate-500 font-bold rounded-xl transition-all h-[46px] whitespace-nowrap shadow-md"
              >
                {analysisLoading ? "Analyzing News..." : "Analyze Risk"}
              </button>
            </div>
          </div>

          {analysisError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-600 p-4 rounded-xl mb-6 relative z-10 text-sm font-medium">
              {analysisError}
            </div>
          )}

          {analysisResult && (
            <div className="flex flex-col gap-6 relative z-10">
              {/* Strategy Header */}
              <div className={`p-6 rounded-2xl border stripe-card-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                analysisResult.strategy.includes("Buy")
                  ? "bg-indigo-50 border-indigo-200"
                  : analysisResult.strategy.includes("Sell")
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-slate-50 border-slate-200"
              }`}>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Recommended Strategy</p>
                  <h4 className={`text-2xl font-black mb-2 ${
                    analysisResult.strategy.includes("Buy") ? "text-indigo-700" 
                    : analysisResult.strategy.includes("Sell") ? "text-emerald-700" 
                    : "text-slate-700"
                  }`}>{analysisResult.strategy}</h4>
                  <p className="text-sm font-medium text-slate-600 border-l-2 pl-3 border-current opacity-80">
                    {analysisResult.strategy_reason}
                  </p>
                </div>
                <div className="text-left md:text-right md:pl-6 md:border-l border-slate-200/50">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Signals Analyzed</p>
                  <p className="text-xl font-bold text-[#0a2540]">{analysisResult.metadata.signals_analyzed}</p>
                </div>
              </div>

              {/* Graphic Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Buy Risk Card */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl stripe-card-shadow relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                  
                  <div className="flex justify-between items-end mb-6 relative z-10">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Buy Risk</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-rose-500">{analysisResult.risk_scores.buy_risk}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-rose-50 rounded-xl">
                      <FaArrowUp className="text-rose-500 text-xl" />
                    </div>
                  </div>

                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden relative z-10 shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)] transition-all duration-1000 ease-out"
                      style={{ width: analysisResult.risk_scores.buy_risk }}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-400 mt-3 relative z-10 font-medium">Driven by negative supply chain sentiment</p>
                </div>

                {/* Sell Pressure Card */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl stripe-card-shadow relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                  
                  <div className="flex justify-between items-end mb-6 relative z-10">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Sell Pressure</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-emerald-500">{analysisResult.risk_scores.sell_pressure}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-xl">
                      <FaArrowDown className="text-emerald-500 text-xl" />
                    </div>
                  </div>

                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden relative z-10 shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-1000 ease-out"
                      style={{ width: analysisResult.risk_scores.sell_pressure }}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-400 mt-3 relative z-10 font-medium">Driven by positive market availability</p>
                </div>

              </div>

              {/* AI Disclaimer */}
              <div className="mt-2 flex items-start gap-3 bg-amber-50/50 border border-amber-200/60 p-3 rounded-xl text-amber-700/80">
                <FaExclamationTriangle className="text-amber-500/80 mt-0.5 shrink-0" />
                <p className="text-xs font-medium leading-relaxed">
                  <strong>AI Disclaimer:</strong> AI can make mistakes. Always verify critical supply chain data independently.
                </p>
              </div>
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-[#0a2540] flex items-center gap-2 mt-12 mb-6">
          <FaBoxOpen className="text-indigo-600" /> Actionable Insights (Market Overview)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {predictions.map((pred) => (
            <div key={pred.id} className="bg-white border border-slate-200 hover:border-indigo-500/50 transition-all rounded-2xl p-6 stripe-card-shadow relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <h4 className="text-lg font-bold text-[#0a2540] leading-tight">{pred.material}</h4>
                <div className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                  pred.trend === 'up' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}>
                  {pred.trend === 'up' ? <FaArrowUp className="h-3 w-3" /> : <FaArrowDown className="h-3 w-3" />}
                  {pred.priceChange}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 relative z-10">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1 font-bold">Availability</p>
                  <p className={`font-semibold text-sm ${
                    pred.availability === 'Critical' ? 'text-rose-400' : 
                    pred.availability === 'Low' ? 'text-amber-400' : 'text-emerald-400'
                  }`}>{pred.availability}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1 font-bold">Urgency</p>
                  <p className={`font-semibold text-sm ${
                    pred.urgency === 'Critical' ? 'text-rose-400' : 
                    pred.urgency === 'High' ? 'text-amber-400' : 'text-slate-500'
                  }`}>{pred.urgency}</p>
                </div>
              </div>

              <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-200 mb-6 relative z-10">
                <p className="text-xs text-slate-500 leading-relaxed italic">"{pred.reason}"</p>
              </div>

              <div className="mt-auto pt-4 border-t border-slate-200 relative z-10 flex justify-between items-center">
                <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">AI Recommendation</p>
                <span className={`px-3 py-1.5 rounded-lg text-sm font-bold ${
                  pred.recommendation === 'Buy Now' || pred.recommendation === 'Lock Contracts' ? 'bg-indigo-600 text-[#0a2540] shadow-lg shadow-indigo-500/20' : 'bg-slate-100 text-slate-600'
                }`}>
                  {pred.recommendation}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
