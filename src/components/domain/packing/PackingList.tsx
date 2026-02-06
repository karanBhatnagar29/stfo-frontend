"use client";

import { useState } from "react";
import { ChecklistItem, Trip } from "@/types/trips";
import { tripsApi } from "@/lib/api/trips";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowLeft } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

interface PackingListProps {
  trip: Trip;
  onReturnClick?: () => void;
}

export default function PackingList({ trip: initialTrip, onReturnClick }: PackingListProps) {
  const [trip, setTrip] = useState(initialTrip);

  // Group items by category (e.g., "Must Pack" implied by logic or explicit category)
  // For this design, let's group by Status (Unpacked vs Packed) to give a sense of clearing
  const unpackedItems = trip.checklist.filter(i => !i.isPacked);
  const packedItems = trip.checklist.filter(i => i.isPacked);

  const toggleItem = async (itemName: string) => {
    // Optimistic Update
    const newChecklist = trip.checklist.map(item => 
        item.name === itemName ? { ...item, isPacked: !item.isPacked } : item
    );
    setTrip({ ...trip, checklist: newChecklist });

    try {
        await tripsApi.togglePacked(trip._id, itemName);
    } catch (e) {
        // Revert on error
        setTrip(initialTrip); 
    }
  };

  const progress = Math.round((packedItems.length / trip.checklist.length) * 100) || 0;

  return (
    <div className="space-y-8 pb-32">
        {/* Header with Progress */}
        <div className="sticky top-0 bg-background/80 backdrop-blur-md z-10 py-6 border-b border-border/50">
            <div className="flex items-center justify-between mb-4">
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div className="flex gap-4 items-center">
                    <div className="text-sm font-medium text-muted-foreground">
                        {progress}% Ready
                    </div>
                    {onReturnClick && (
                         <button onClick={onReturnClick} className="text-xs bg-secondary hover:bg-secondary/80 px-3 py-1.5 rounded-full transition-colors text-foreground font-medium">
                            Complete Trip
                         </button>
                    )}
                </div>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">{trip.destination}</h1>
            <div className="h-1 w-full bg-secondary mt-4 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                />
            </div>
        </div>

        {/* Unpacked List */}
        <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">To Pack</h3>
            <AnimatePresence mode="popLayout">
                {unpackedItems.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="p-8 text-center text-muted-foreground italic"
                    >
                        All packed. You're ready to go.
                    </motion.div>
                )}
                {unpackedItems.map((item) => (
                    <motion.div
                        key={item.name}
                        layoutId={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={() => toggleItem(item.name)}
                        className="group flex items-center justify-between p-4 bg-card border border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors"
                    >
                        <span className="text-lg font-medium">{item.name}</span>
                        <div className="w-6 h-6 rounded-full border-2 border-muted-foreground/30 group-hover:border-primary transition-colors" />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>

        {/* Packed List (Collapsed/Dimmed) */}
        {packedItems.length > 0 && (
            <div className="space-y-4 pt-8 opacity-50 hover:opacity-100 transition-opacity">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Packed</h3>
                {packedItems.map((item) => (
                     <motion.div
                        key={item.name}
                        layoutId={item.name}
                        onClick={() => toggleItem(item.name)}
                        className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl cursor-pointer"
                    >
                        <span className="text-lg font-medium line-through text-muted-foreground">{item.name}</span>
                         <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                             <Check className="w-3.5 h-3.5" />
                         </div>
                    </motion.div>
                ))}
            </div>
        )}
    </div>
  );
}
