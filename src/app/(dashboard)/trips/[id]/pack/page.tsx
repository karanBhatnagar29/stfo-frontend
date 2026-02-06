"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { tripsApi } from "@/lib/api/trips";
import { Trip } from "@/types/trips";
import PackingList from "@/components/domain/packing/PackingList";
import ReturnConfirmation from "@/components/domain/trips/ReturnConfirmation";
import { Loader2 } from "lucide-react";

export default function PackingPage() {
  const params = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  const [showReturn, setShowReturn] = useState(false);

  // ... fetch logic ...

  if (loading || !trip) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>;

  return (
      <>
          <PackingList trip={trip} onReturnClick={() => setShowReturn(true)} />
          {showReturn && (
              <ReturnConfirmation 
                trip={trip} 
                onClose={() => setShowReturn(false)}
                onComplete={(t) => {
                    setTrip(t);
                    setShowReturn(false);
                }}
              />
          )}
      </>
  );
}
