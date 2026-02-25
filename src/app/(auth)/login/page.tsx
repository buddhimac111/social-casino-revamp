"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoginLoading, isLoginError, resetLoginError } = useAuth();
  const router = useRouter();

  // Reset errors when form inputs change
  useEffect(() => {
    if (email || password) {
      if (isLoginError) {
        resetLoginError();
      }
    }
  }, [email, password, isLoginError, resetLoginError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate fields and show toast errors
    if (!email && !password) {
      toast.error("Please enter your email and password");
      return;
    }

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    try {
      await login({ email, password });

      // Show success toast
      toast.success("Login successful! Redirecting...");
      window.location.href = "/";
    } catch (error) {
      // Error is already handled by React Query mutation and shown as toast
      console.log("Login error handled by mutation", error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center py-12 px-10 sm:px-10 lg:px-10 z-50">
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 p-2 text-white hover:text-gray-300 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col items-center">
            <div className="mb-3">
              <Image
                src="/media/logo_main.png"
                alt="Casino Logo"
                width={160}
                height={160}
              />
            </div>
            {/* <h2 className="text-3xl font-bold text-white">Login</h2> */}
          </div>
          <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 text-black rounded-lg bg-transparent pl-4 pr-4 border-2 border-gray-400 outline-none shadow-md focus:ring-2 focus:ring-[#6C4AB6] peer text-lg"
                  placeholder=" "
                  autoComplete="off"
                />
                <label
                  className={`absolute left-4 ${email ? "-top-3" : "top-1/2 -translate-y-1/2"} ${email ? "text-white" : "text-gray-400"}  ${email ? "bg-[#1B2343]" : "bg-transparent"} px-2 transition-all duration-200 pointer-events-none ${email ? "text-xs" : "text-lg"} font-medium z-10`}
                >
                  Email Address
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 text-black rounded-lg bg-transparent pl-4 pr-4 border-2 border-gray-400 outline-none shadow-md focus:ring-2 focus:ring-[#6C4AB6] peer text-lg"
                  placeholder=" "
                  autoComplete="off"
                />
                <label
                  className={`absolute left-4 ${password ? "-top-3" : "top-1/2 -translate-y-1/2"} ${password ? "text-white" : "text-gray-400"} ${password ? "bg-[#1B2343]" : "bg-transparent"} px-2 transition-all duration-200 pointer-events-none ${password ? "text-xs" : "text-lg"} font-medium z-10`}
                >
                  Enter Password
                </label>
              </div>
              <div className="flex justify-end">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-white hover:text-gray-300 hover:underline transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoginLoading}
                className="w-full h-12 rounded-lg bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold disabled:opacity-50 transition-colors"
              >
                {isLoginLoading ? "Logging in..." : "Login"}
              </button>

              {/* Social Login Section */}
              <div className="mt-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="flex-1 h-px bg-(--lines)"></div>
                  <span className="px-4 text-white text-sm">Or Login with</span>
                  <div className="flex-1 h-px bg-(--lines)"></div>
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    type="button"
                    className="flex-1 max-w-[120px] h-12 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 flex items-center justify-center"
                    aria-label="Login with Facebook"
                  >
                    <Image src="/media/facebook_icon.png" alt="" width={24} height={24} />
                  </button>
                  <button
                    type="button"
                    className="flex-1 max-w-[120px] h-12 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 flex items-center justify-center"
                    aria-label="Login with Google"
                  >
                    <Image src="/media/google_icon.png" alt="" width={24} height={24} />
                  </button>
                  <button
                    type="button"
                    className="flex-1 max-w-[120px] h-12 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 flex items-center justify-center"
                    aria-label="Login with Apple"
                  >
                    <Image src="/media/apple_icon.png" alt="" width={24} height={24} />
                  </button>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <Link
                  href="/auth/signup/1"
                  className="text-md text-white hover:underline"
                >
                  Don&apos;t have an account?{" "}
                  <span className="font-semibold">Sign up</span>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
