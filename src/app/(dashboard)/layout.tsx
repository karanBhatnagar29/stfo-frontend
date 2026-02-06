"use client";

import { useAuthStore } from "@/lib/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, accessToken } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!accessToken) {
      router.replace("/login");
    }
  }, [accessToken, router]);

  if (!mounted || !accessToken) return null; // Or a subtle loading spinner

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
        <header className="mb-12 flex justify-between items-center">
            <div className="h-6 w-6 bg-primary rounded-full" /> {/* Minimal Logo */}
            {/* Minimal Nav or Profile Icon could go here */}
        </header>
        <main className="max-w-4xl mx-auto">
            {children}
        </main>
    </div>
  );
}
