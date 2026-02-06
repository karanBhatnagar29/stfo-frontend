"use client";

import { useAuthStore } from "@/lib/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth";
import { Loader2, User, Mail, Shield } from "lucide-react";

export default function ProfileView() {
  const { accessToken } = useAuthStore();
  
  // Fetch profile logic would usually go here using React Query
  // For now, implementing direct fetch effect if not using Query fully yet
  const { data: user, isLoading, error } = useQuery({
      queryKey: ['profile'],
      queryFn: authApi.getProfile,
      enabled: !!accessToken
  });

  if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;
  if (error) return <div className="text-destructive p-8 text-center">Failed to load profile.</div>;

  return (
    <div className="space-y-8 max-w-lg mx-auto">
        <h1 className="text-3xl font-light tracking-tight">Your Profile</h1>
        
        <div className="bg-card border border-border rounded-xl p-8 space-y-6">
            <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-secondary rounded-full flex items-center justify-center">
                    <span className="text-2xl font-medium text-muted-foreground">
                        {user.firstName?.[0]}{user.lastName?.[0]}
                    </span>
                </div>
                <div>
                    <h2 className="text-xl font-medium">{user.firstName} {user.lastName}</h2>
                    <p className="text-sm text-muted-foreground">Traveler</p>
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                </div>
                 <div className="flex items-center gap-3 text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>{user.roles?.join(', ') || 'User'}</span>
                </div>
            </div>
        </div>
    </div>
  );
}
