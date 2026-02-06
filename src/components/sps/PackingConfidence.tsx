"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plane, Calendar, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function PackingConfidence() {
  const [step, setStep] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);

  const startAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
        setAnalyzing(false);
        setStep(1);
    }, 1500);
  };

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-background">
      <div className="p-6 border-b border-border bg-secondary/10">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Plane className="w-5 h-5" />
          Will it fit my trip?
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Use the SPS algorithm to check compatibility.
        </p>
      </div>

      <div className="p-6 min-h-[250px] flex flex-col justify-center">
        {step === 0 ? (
           <div className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                       <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Destination</label>
                       <select className="w-full h-10 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                           <option>International (General)</option>
                           <option>Europe (Strict)</option>
                           <option>USA (Domestic)</option>
                           <option>Asia (Pacific)</option>
                       </select>
                   </div>
                   <div className="space-y-2">
                       <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Duration</label>
                       <select className="w-full h-10 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                           <option>Weekend (2-3 Days)</option>
                           <option>Week (5-7 Days)</option>
                           <option>Extended (10+ Days)</option>
                       </select>
                   </div>
               </div>
               
               <button 
                onClick={startAnalysis}
                disabled={analyzing}
                className="w-full bg-foreground text-background font-medium h-12 rounded-lg mt-4 disabled:opacity-70 disabled:cursor-wait hover:bg-foreground/90 transition-colors"
               >
                 {analyzing ? "Analyzing Packing Logic..." : "Check Compatibility"}
               </button>
           </div>
        ) : (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
            >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                    <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold mb-2">Perfect Fit</h4>
                <p className="text-muted-foreground text-sm mb-6">
                    This carry-on is optimized for up to 7 days in Europe. The SPS insert will organize roughly 45 items efficiently.
                </p>
                <button 
                    onClick={() => setStep(0)}
                    className="text-sm font-medium underline underline-offset-4 hover:text-muted-foreground"
                >
                    Check another trip
                </button>
            </motion.div>
        )}
      </div>
    </div>
  );
}
