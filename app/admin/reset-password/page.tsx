"use client";

import { useActionState, use } from "react";
import { resetPasswordAction } from "@/app/actions/auth";
import { Lock, ShieldCheck, ArrowLeft, Key } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import Link from "next/link";

function MotionEyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${light ? "text-[#c7e993]" : "text-[#017775]"} mb-4 block text-xs font-semibold uppercase tracking-[0.2em]`}
    >
      {children}
    </motion.span>
  );
}

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = use(searchParams);
  const [state, formAction, isPending] = useActionState(resetPasswordAction, undefined);

  return (
    <div className="min-h-screen bg-[#120f0c] flex items-center justify-center p-6 selection:bg-[#c7e993] selection:text-[#120f0c]">
      <div className="w-full max-w-[440px]">
        {/* Branding Header */}
        <div className="mb-8 text-center md:mb-12 lg:pl-2 lg:text-left">
          <MotionEyebrow light>Security Update</MotionEyebrow>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-medium tracking-tight text-white md:text-5xl lg:leading-[1.1]"
            style={{ fontFamily: "var(--font-manrope), sans-serif" }}
          >
            Create <br />
            <span className="text-white/60">New Password.</span>
          </motion.h1>
        </div>

        {/* Reset Password Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Decorative Corner */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#c7e993]/5 rounded-full blur-3xl pointer-events-none" />
          
          <form action={formAction} className="space-y-8 relative z-10">
            <input type="hidden" name="token" value={token} />
            
            <div className="space-y-6">
              <p className="text-sm text-[#787b78] leading-relaxed">
                Your recovery link was verified. Please set a new administrative password that you will use for future sign-ins.
              </p>
              
              <div className="group relative">
                <div className="absolute left-0 top-[18px] text-[#787b78] transition-colors group-focus-within:text-[#c7e993]">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="NEW PASSWORD"
                  className="w-full bg-transparent border-b border-white/10 py-4 pl-8 text-sm font-medium tracking-widest text-white placeholder:text-[#787b78]/40 focus:outline-none focus:border-[#c7e993] transition-all"
                />
              </div>

              <div className="group relative">
                <div className="absolute left-0 top-[18px] text-[#787b78] transition-colors group-focus-within:text-[#c7e993]">
                  <Key size={20} />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="CONFIRM PASSWORD"
                  className="w-full bg-transparent border-b border-white/10 py-4 pl-8 text-sm font-medium tracking-widest text-white placeholder:text-[#787b78]/40 focus:outline-none focus:border-[#c7e993] transition-all"
                />
              </div>
            </div>

            {state?.error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-[#c76754] text-xs font-semibold uppercase tracking-widest pt-2"
              >
                {state.error}
              </motion.div>
            )}

            <div className="pt-4 space-y-4">
              <button
                type="submit"
                disabled={isPending}
                className="group relative flex w-full items-center justify-between overflow-hidden border border-white/10 bg-white/5 px-8 py-5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:border-[#c7e993] hover:text-[#120f0c]"
              >
                {/* Background Hover Slide */}
                <div className="absolute inset-0 z-0 h-full w-full -translate-x-full bg-[#c7e993] transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:translate-x-0" />
                
                <span className="relative z-10">
                  {isPending ? "UPDATING..." : "RESET & SIGN IN"}
                </span>
                
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                  <ShieldCheck size={18} weight="bold" />
                </span>
              </button>

              <Link 
                href="/admin/login"
                className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#787b78] hover:text-white transition-colors py-2"
              >
                <ArrowLeft size={12} />
                Cancel
              </Link>
            </div>
          </form>
        </motion.div>

        {/* Footer info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex items-center justify-between border-t border-white/5 pt-8"
        >
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#787b78]/60">
            System v2.4.0
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#787b78]/60">
            &copy; 2026 JOSEPH.CO
          </div>
        </motion.div>
      </div>
    </div>
  );
}
