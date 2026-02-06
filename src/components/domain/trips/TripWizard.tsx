"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTripDto, createTripSchema, TripType } from "@/types/trips";
import { tripsApi } from "@/lib/api/trips";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Plane, Briefcase } from "lucide-react";
import clsx from "clsx";

const steps = [
  { id: "destination", question: "Where are you going?" },
  { id: "dates", question: "When is the trip?" },
  { id: "type", question: "Business or Leisure?" },
];

export default function TripWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, setValue, watch, trigger } = useForm<CreateTripDto>({
    resolver: zodResolver(createTripSchema),
    defaultValues: {
        tripType: TripType.LEISURE
    }
  });

  const formValues = watch();

  const nextStep = async () => {
    let valid = false;
    if (currentStep === 0) valid = await trigger("destination");
    if (currentStep === 1) valid = await trigger(["startDate", "endDate"]);
    
    if (valid) {
        if (currentStep < steps.length - 1) {
            setCurrentStep(c => c + 1);
        } else {
            submitTrip();
        }
    }
  };

  const submitTrip = async () => {
      setIsSubmitting(true);
      try {
          const trip = await tripsApi.create(formValues);
          // Auto-generate suggestions
          // In a real flow, we might ask for confirmation or show a loading state while "AI thinks"
          router.push(`/trips/${trip._id}/pack`); 
      } catch (e) {
          console.error(e);
          setIsSubmitting(false);
      }
  };

  return (
    <div className="min-h-[60vh] flex flex-col justify-center max-w-xl mx-auto">
        {/* Progress Indicator */}
        <div className="flex gap-2 mb-12">
            {steps.map((_, idx) => (
                <div 
                    key={idx}
                    className={clsx(
                        "h-1 flex-1 rounded-full transition-colors duration-500",
                        idx <= currentStep ? "bg-primary" : "bg-primary/10"
                    )}
                />
            ))}
        </div>

        <AnimatePresence mode="wait">
            <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="space-y-8"
            >
                <h2 className="text-3xl font-light text-primary">{steps[currentStep].question}</h2>
                
                {/* Step 1: Destination */}
                {currentStep === 0 && (
                     <input
                        {...register("destination")}
                        autoFocus
                        placeholder="e.g. Tokyo, Japan"
                        className="w-full text-4xl bg-transparent border-b-2 border-border focus:border-primary outline-none py-4 placeholder:text-muted-foreground/30 transition-colors"
                        onKeyDown={(e) => e.key === 'Enter' && nextStep()}
                    />
                )}

                {/* Step 2: Dates */}
                {currentStep === 1 && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-sm text-muted-foreground">Start Date</label>
                                <input
                                    type="date"
                                    {...register("startDate")}
                                    className="w-full text-2xl bg-transparent border-b border-border focus:border-primary outline-none py-2"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-muted-foreground">End Date</label>
                                <input
                                    type="date"
                                    {...register("endDate")}
                                    className="w-full text-2xl bg-transparent border-b border-border focus:border-primary outline-none py-2"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Type */}
                {currentStep === 2 && (
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => { setValue("tripType", TripType.LEISURE); submitTrip(); }}
                            className="h-32 rounded-xl border border-border hover:border-primary hover:bg-secondary/50 transition-all flex flex-col items-center justify-center gap-4 group"
                        >
                            <Plane className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="font-medium">Leisure</span>
                        </button>
                        <button
                             type="button"
                             onClick={() => { setValue("tripType", TripType.BUSINESS); submitTrip(); }}
                             className="h-32 rounded-xl border border-border hover:border-primary hover:bg-secondary/50 transition-all flex flex-col items-center justify-center gap-4 group"
                        >
                             <Briefcase className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                             <span className="font-medium">Business</span>
                        </button>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>

        {/* Navigation Actions (Hidden on last step as it auto-submits) */}
        {currentStep < 2 && (
             <motion.div 
                className="mt-12 flex justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
             >
                 <button
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                 >
                    Next <ArrowRight className="w-4 h-4" />
                 </button>
             </motion.div>
        )}

        {isSubmitting && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center backdrop-blur-sm z-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground animate-pulse">Generating packing list...</p>
                </div>
            </div>
        )}
    </div>
  );
}
