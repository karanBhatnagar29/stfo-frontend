"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
    <section ref={ref} className="relative w-full h-screen min-h-[800px] flex flex-col items-center justify-center overflow-hidden bg-background">
      
      {/* Background Gradient Spot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 z-10 flex flex-col items-center text-center">
        
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
        >
            <span className="inline-block py-1 px-3 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold tracking-widest uppercase">
                New Release
            </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-7xl md:text-9xl font-semibold tracking-tighter text-foreground leading-[0.95] mb-6"
        >
          Travel <br className="md:hidden" />
          <span className="text-muted-foreground">Reimagined.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-10"
        >
          The first suitcase that thinks for you. Integrated smart packing system.
          <br className="hidden md:block" /> beauty and brains in one aluminum shell.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <Link
            href="/products/carry-on"
            className="inline-flex items-center justify-center h-12 px-8 text-base font-medium transition-all bg-foreground text-background hover:bg-foreground/80 rounded-full"
          >
            Buy Now
          </Link>
          <Link
            href="/sps-system"
            className="inline-flex items-center justify-center h-12 px-8 text-base font-medium transition-all text-foreground hover:text-foreground/70 group"
          >
            Learn more
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

       {/* Hero Visual Placeholder - "The Product" */}
       <motion.div 
        style={{ y, opacity }}
        className="absolute bottom-0 w-full h-[40vh] md:h-[50vh] flex items-end justify-center pointer-events-none"
       >
         {/* This represents the top of the suitcase rising from the bottom */}
         <div className="w-[80%] md:w-[40%] h-full bg-gradient-to-t from-gray-200 to-gray-100 rounded-t-[3rem] shadow-2xl border-t border-white/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%)] opacity-50" />
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-2 bg-gray-300 rounded-full" />
            <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-300 font-bold text-4xl tracking-widest opacity-20">HELIOS</span>
            </div>
         </div>
       </motion.div>
    </section>
  );
}
