"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Package, Zap, Shield } from "lucide-react";
import { useRef } from "react";

export function ProductHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative w-full h-screen min-h-[900px] flex flex-col items-center justify-center overflow-hidden bg-background pt-20">
      
      {/* Subtle background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-6 z-10 flex flex-col items-center text-center">
        
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
        >
            <span className="inline-block py-2 px-4 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-semibold tracking-widest uppercase">
                ✨ Introducing HELIOS
            </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.1] mb-6 text-balance"
        >
          The Suitcase That <span className="text-accent">Thinks</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-12"
        >
          Meet HELIOS: intelligent luggage engineered for the modern traveler. Smart packing optimization, premium materials, and timeless design in one.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 items-center mb-16"
        >
          <Link
            href="/products/carry-on"
            className="inline-flex items-center justify-center h-13 px-8 text-base font-semibold transition-all bg-foreground text-background hover:bg-foreground/90 hover:shadow-lg rounded-lg"
          >
            Shop Now
          </Link>
          <Link
            href="/products/sps-system"
            className="inline-flex items-center justify-center h-13 px-8 text-base font-semibold transition-all border-2 border-foreground text-foreground hover:bg-foreground/5 rounded-lg group"
          >
            Learn the System
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.45 }}
          className="grid grid-cols-3 gap-8 w-full max-w-xl text-sm"
        >
          <div className="flex flex-col items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            <span className="text-xs font-medium text-muted-foreground">Smart Packing</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Shield className="w-5 h-5 text-accent" />
            <span className="text-xs font-medium text-muted-foreground">Lifetime Warranty</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Package className="w-5 h-5 text-accent" />
            <span className="text-xs font-medium text-muted-foreground">Free Returns</span>
          </div>
        </motion.div>
      </div>

       {/* Hero Product Visualization */}
       <motion.div 
        style={{ y, opacity }}
        className="absolute bottom-0 w-full h-1/2 flex items-end justify-center pointer-events-none"
       >
         <div className="relative w-80 h-96 mb-12">
           {/* Main suitcase body */}
           <div className="absolute inset-0 bg-gradient-to-br from-slate-300 via-slate-200 to-slate-400 rounded-2xl shadow-2xl border border-white/40" />
           
           {/* Metal reinforcement details */}
           <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 h-1.5 bg-gradient-to-r from-transparent via-slate-400 to-transparent rounded-full opacity-60" />
           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-slate-400 to-transparent opacity-40" />
           
           {/* Smart packing grid visualization */}
           <div className="absolute inset-6 grid grid-cols-3 grid-rows-3 gap-2 opacity-20">
             {Array.from({ length: 9 }).map((_, i) => (
               <div key={i} className="border border-slate-600 rounded" />
             ))}
           </div>
           
           {/* Product name */}
           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
             <p className="text-sm font-semibold text-slate-700 tracking-widest uppercase">HELIOS</p>
             <p className="text-xs text-slate-500 tracking-wide">Carry-On / Check-In</p>
           </div>
         </div>
       </motion.div>
    </section>
  );
}
