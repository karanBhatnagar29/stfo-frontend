"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { tripsApi } from "@/lib/api/trips";
import { Trip } from "@/types/trips";
import { Loader2, Check } from "lucide-react";
import clsx from "clsx";

interface ReturnConfirmationProps {
    trip: Trip;
    onClose: () => void;
    onComplete: (trip: Trip) => void;
}

export default function ReturnConfirmation({ trip, onClose, onComplete }: ReturnConfirmationProps) {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Items that were packed are candidates for return
    const packedItems = trip.checklist.filter(i => i.isPacked);

    const toggleItem = (name: string) => {
        setSelectedItems(prev => 
            prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
        );
    };

    const submitReturn = async () => {
        setIsSubmitting(true);
        try {
            const updatedTrip = await tripsApi.confirmReturn(trip._id, selectedItems);
            onComplete(updatedTrip);
        } catch (e) {
            console.error(e);
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
        >
            <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-card border border-border rounded-xl w-full max-w-lg p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-light">Welcome back!</h2>
                    <p className="text-muted-foreground">What did you bring back?</p>
                </div>

                <div className="space-y-2">
                    {packedItems.map(item => (
                        <div 
                            key={item.name}
                            onClick={() => toggleItem(item.name)}
                            className={clsx(
                                "flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all border",
                                selectedItems.includes(item.name) 
                                    ? "bg-primary text-primary-foreground border-primary" 
                                    : "bg-secondary/50 border-transparent hover:border-primary/50"
                            )}
                        >
                            <span className="font-medium">{item.name}</span>
                            {selectedItems.includes(item.name) && <Check className="w-5 h-5" />}
                        </div>
                    ))}
                </div>

                <div className="flex gap-4 pt-4">
                     <button 
                        onClick={onClose}
                        className="flex-1 py-3 text-sm font-medium hover:bg-secondary rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                         onClick={submitReturn}
                         disabled={isSubmitting}
                         className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                        Confirm Return
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
