"use client";

import { motion } from "framer-motion";
import { Plus, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { tripsApi } from "@/lib/api/trips";
import { Trip } from "@/types/trips";

export default function DashboardPage() {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening";
  
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      tripsApi.findAll()
        .then(setTrips)
        .catch(console.error)
        .finally(() => setLoading(false));
  }, []);

  const activeTrips = trips.filter(t => t.status !== 'COMPLETED');

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="space-y-16"
    >
        {/* Header Section */}
        <section className="space-y-4">
            <h1 className="text-4xl font-light tracking-tight text-primary">
                {greeting}.<br />
                <span className="text-muted-foreground">
                    {activeTrips.length > 0 ? "Your checklist awaits." : "Ready for your next journey?"}
                </span>
            </h1>
        </section>

        {/* Action Section */}
        {activeTrips.length === 0 ? (
            <section>
                <Link href="/trips/new">
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative overflow-hidden rounded-xl bg-card border border-border p-8 transition-all hover:border-primary/20 hover:shadow-lg cursor-pointer max-w-md"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary group-hover:bg-primary transition-colors">
                                <Plus className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium">Plan a new trip</h3>
                                <p className="text-sm text-muted-foreground">Start the packing ritual.</p>
                            </div>
                        </div>
                    </motion.div>
                </Link>
            </section>
        ) : (
            <section className="grid md:grid-cols-2 gap-6">
                 {/* Main Action for First Trip */}
                 <Link href={`/trips/${activeTrips[0]._id}/pack`} className="col-span-1 md:col-span-2">
                    <motion.div 
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="group relative overflow-hidden rounded-xl bg-primary text-primary-foreground p-8 cursor-pointer shadow-xl shadow-primary/10"
                    >
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <p className="text-primary-foreground/60 text-sm font-medium uppercase tracking-wider">Current Trip</p>
                                <h3 className="text-3xl font-light">{activeTrips[0].destination}</h3>
                                <p className="text-primary-foreground/80">
                                    {new Date(activeTrips[0].startDate).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </div>
                        
                        {/* Mini Progress Bar */}
                        <div className="mt-8 space-y-2">
                            <div className="flex justify-between text-xs opacity-70">
                                <span>Packing Status</span>
                                <span>
                                    {Math.round((activeTrips[0].checklist.filter(i => i.isPacked).length / activeTrips[0].checklist.length) * 100)}%
                                </span>
                            </div>
                            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-white" 
                                    style={{ width: `${(activeTrips[0].checklist.filter(i => i.isPacked).length / activeTrips[0].checklist.length) * 100}%` }}
                                />
                            </div>
                        </div>
                    </motion.div>
                 </Link>
                 
                 {/* Secondary Create Button */}
                  <Link href="/trips/new">
                        <div className="h-full min-h-[120px] rounded-xl border border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer text-muted-foreground hover:text-primary">
                             <Plus className="w-6 h-6" />
                             <span className="text-sm font-medium">Add another trip</span>
                        </div>
                  </Link>
            </section>
        )}

    </motion.div>
  );
}
