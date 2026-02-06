"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Plane, Calendar, Briefcase, Sun, Check } from "lucide-react";
import Link from "next/link";

export default function SPSSystemPage() {
  const [stage, setStage] = useState<"input" | "processing" | "result">("input");
  
  // Form State
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState<number | "">("");
  const [type, setType] = useState<"Business" | "Leisure">("Leisure");

  const handleAnalyze = () => {
    if (!destination || !days) return;
    setStage("processing");
    setTimeout(() => {
      setStage("result");
    }, 2500); // Simulate AI crunching
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 container mx-auto flex flex-col items-center">
      
      {/* Header */}
      <div className="text-center max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-xs font-semibold tracking-wider uppercase mb-6">
          <BrainCircuit className="w-4 h-4" />
          SPS Intelligence Beta
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
          Travel Solved<br />
          Before You Pack.
        </h1>
        <p className="text-muted-foreground text-lg">
          Tell us where you're going. We'll tell you how to pack, what to bring, and which vessel works best.
        </p>
      </div>

      {/* Main Interface */}
      <div className="w-full max-w-xl bg-background border border-border rounded-2xl shadow-2xl shadow-secondary/20 overflow-hidden relative min-h-[400px]">
        
        <AnimatePresence mode="wait">
          {stage === "input" && (
            <motion.div 
              key="input"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}
              className="p-8 space-y-8"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">Where to?</label>
                  <div className="relative">
                    <Plane className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
                    <input 
                      type="text" 
                      placeholder="e.g. Tokyo, Japan" 
                      className="w-full pl-12 pr-4 py-3 bg-secondary/10 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-foreground/10 transition-all font-medium"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-muted-foreground">Duration</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
                        <input 
                          type="number" 
                          placeholder="Days" 
                          className="w-full pl-12 pr-4 py-3 bg-secondary/10 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-foreground/10 transition-all font-medium"
                          value={days}
                          onChange={(e) => setDays(Number(e.target.value))}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-muted-foreground">Purpose</label>
                      <div className="flex bg-secondary/10 p-1 rounded-xl border border-border">
                         <button 
                            onClick={() => setType("Leisure")}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${type === "Leisure" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                         >
                            <Sun className="w-4 h-4" />
                            Leisure
                         </button>
                         <button 
                            onClick={() => setType("Business")}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${type === "Business" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                         >
                            <Briefcase className="w-4 h-4" />
                            Biz
                         </button>
                      </div>
                    </div>
                </div>
              </div>

              <button 
                onClick={handleAnalyze}
                disabled={!destination || !days}
                className="w-full py-4 bg-foreground text-background font-bold rounded-xl text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Protocol
              </button>
            </motion.div>
          )}

          {stage === "processing" && (
            <motion.div 
              key="processing"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-background"
            >
              <div className="w-16 h-16 border-4 border-secondary border-t-foreground rounded-full animate-spin mb-6" />
              <h3 className="text-xl font-bold mb-2">Analyzing Weather & Logic...</h3>
              <p className="text-muted-foreground">Calibrating SPS specifically for {destination}.</p>
            </motion.div>
          )}

          {stage === "result" && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="p-8 h-full flex flex-col"
            >
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-border font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <span>Protocol #8821X</span>
                <span>{days} Days • {type}</span>
              </div>

              <div className="space-y-6 flex-1">
                <div>
                   <h3 className="font-bold text-lg mb-2">Recommended Vessel</h3>
                   <div className="p-4 bg-secondary/20 rounded-xl border border-border flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse" /> {/* Img Placeholder */}
                      <div>
                          <p className="font-bold">Carry-On Pro</p>
                          <p className="text-sm text-green-600 font-medium">98% Match Score</p>
                      </div>
                      <Link href="/products/carry-on-pro" className="ml-auto text-xs font-bold underline">VIEW</Link>
                   </div>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-2">SPS Loadout Strategy</h3>
                    <ul className="space-y-2">
                        {["Deploy Compression Zone A for suits.", "Use Tech-Guard Pocket for laptop.", "Limit footwear to 2 pairs.", "Pack heavier items near wheels."].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
              </div>

              <button 
                onClick={() => setStage("input")}
                className="mt-8 w-full py-3 border border-input font-medium rounded-xl hover:bg-secondary transition-colors"
              >
                Run Another Simulation
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
