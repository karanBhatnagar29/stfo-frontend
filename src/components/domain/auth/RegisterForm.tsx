"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RegisterDto, registerSchema } from "@/types/auth";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default function RegisterForm() {
  const router = useRouter();
  const setTokens = useAuthStore((state) => state.setTokens);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterDto>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterDto) => {
    setError(null);
    try {
      const res = await authApi.register(data);
      setTokens(res.accessToken, res.refreshToken);
      router.push("/dashboard");
    } catch (err: any) {
      setError("Registration failed. Email might be taken.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-sm space-y-8"
    >
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-medium tracking-tight text-primary">Join SPS</h1>
        <p className="text-muted-foreground text-sm">Packing, perfected.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <input
              {...register("firstName")}
              placeholder="First Name"
              className={clsx(
                "flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                errors.firstName && "border-destructive focus-visible:ring-destructive"
              )}
            />
             {errors.firstName && <span className="text-xs text-destructive ml-1">{errors.firstName.message}</span>}
          </div>
          <div className="space-y-2">
            <input
              {...register("lastName")}
              placeholder="Last Name"
              className={clsx(
                "flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                errors.lastName && "border-destructive focus-visible:ring-destructive"
              )}
            />
             {errors.lastName && <span className="text-xs text-destructive ml-1">{errors.lastName.message}</span>}
          </div>
        </div>

        <div className="space-y-2">
          <input
            {...register("email")}
            placeholder="Email"
            className={clsx(
              "flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              errors.email && "border-destructive focus-visible:ring-destructive"
            )}
          />
          {errors.email && <span className="text-xs text-destructive ml-1">{errors.email.message}</span>}
        </div>

        <div className="space-y-2">
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className={clsx(
              "flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              errors.password && "border-destructive focus-visible:ring-destructive"
            )}
          />
          {errors.password && <span className="text-xs text-destructive ml-1">{errors.password.message}</span>}
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-xs text-destructive text-center"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full h-12 bg-primary text-primary-foreground rounded-md text-sm font-medium transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline underline-offset-4 decoration-primary/30">
          Sign in
        </Link>
      </div>
    </motion.div>
  );
}
