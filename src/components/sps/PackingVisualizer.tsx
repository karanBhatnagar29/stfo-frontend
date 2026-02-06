"use client";

import { motion } from "framer-motion";
import { Layers, Box, ScanLine, Smartphone } from "lucide-react";

export function PackingVisualizer() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Intelligence Inside.
          </h2>
          <p className="max-w-2xl text-muted-foreground text-lg md:text-xl leading-relaxed">
            More than just a suitcase. A modular system that adapts to your trip type, 
            duration, and destination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
            
            {/* Main Large Card - The Visualizer */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="md:col-span-2 row-span-2 rounded-[2rem] bg-background border border-white/50 shadow-sm overflow-hidden relative group"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-50" />
                <div className="relative p-10 h-full flex flex-col items-start z-10">
                    <div className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl mb-4 shadow-sm">
                        <ScanLine className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className="text-3xl font-semibold tracking-tight mb-2">Trip Wizard™</h3>
                    <p className="text-muted-foreground text-lg max-w-sm">
                        Scan the QR code to generate a custom packing list based on your specific itinerary.
                    </p>
                    
                    {/* Visual Demo Stub */}
                    <div className="mt-auto w-full h-[60%] bg-white/50 rounded-xl border border-white/60 shadow-inner flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                             <div className="text-center">
                                <Smartphone className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2" />
                                <p className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest">Interactive Demo</p>
                             </div>
                        </div>
                        {/* Scanning Animation */}
                        <motion.div 
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-[1px] bg-foreground/20 shadow-[0_0_15px_rgba(0,0,0,0.1)]"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Feature Card 1 */}
            <BentoCard 
                icon={<Layers className="w-6 h-6" />}
                title="Modular Zones"
                description="Dedicated compartments for tech, toiletries, and apparel."
                delay={0.1}
            />

            {/* Feature Card 2 */}
            <BentoCard 
                icon={<Box className="w-6 h-6" />}
                title="Compression Tech"
                description="Proprietary vacuum latch saves 30% more space."
                delay={0.2}
            />
            
        </div>
      </div>
    </section>
  );
}

function BentoCard({ icon, title, description, delay = 0 }: { icon: React.ReactNode; title: string; description: string; delay?: number }) {
  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className="p-8 rounded-[2rem] bg-background border border-white/50 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-32 bg-secondary/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10 w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center mb-6 text-foreground">
        {icon}
      </div>
      <div className="relative z-10">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground leading-relaxed text-sm">{description}</p>
      </div>
    </motion.div>
  );
}

