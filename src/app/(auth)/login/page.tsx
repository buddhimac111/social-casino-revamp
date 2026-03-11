"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import CustomButton from "@/components/common/CustomButton";

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
      <div className="min-h-screen flex bg-background">
        <div className="relative hidden lg:flex w-1/2 items-center justify-center overflow-hidden">
          <Image
            src="/media/image_login.png"
            alt="Casino login illustration"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-1 items-center justify-center px-8 py-10 sm:px-12 lg:px-20">
          <div className="w-full max-w-md">
            <div className="mb-8 flex justify-center items-center gap-3 text-header-blue">
              <Image
                src="/logos/logo_,main.png"
                alt="747 Social"
                width={38}
                height={38}
              />
              <span className="text-2xl font-bold text-main-green">
                747 Social
              </span>
            </div>

            <Tabs
              defaultValue="login"
              className="w-full"
              onValueChange={(value) => {
                if (value === "signup") {
                  router.push("/auth/signup/1");
                }
              }}
            >
              <TabsList className="mb-8 w-full justify-between rounded-xl bg-accent-blue p-1">
                <TabsTrigger
                  value="login"
                  className="flex-1 rounded-lg data-[state=active]:bg-white "
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="flex-1 rounded-lg data-[state=active]:bg-white"
                >
                  Signup
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <h1 className="mb-6 text-2xl font-bold text-text-ash text-center">
                  Login To Your Account
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm text-text-ash">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                        placeholder="Enter Your Email"
                        className="h-11 bg-white text-header-blue"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="password"
                        className="text-sm text-text-ash"
                      >
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="off"
                        placeholder="Enter Your Password"
                        className="h-11 bg-white text-header-blue"
                      />
                      <div className="mt-1 flex justify-end">
                        <Link
                          href="/auth/forgot-password"
                          className="text-xs font-medium text-main-green hover:text-main-green hover:underline"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    </div>
                  </div>

                  <CustomButton
                    type="submit"
                    text={isLoginLoading ? "Logging in..." : "Login"}
                    disabled={isLoginLoading}
                    isLoading={isLoginLoading}
                    additionalTailwindClass="w-full rounded-full h-11 !text-base"
                  />
                </form>

                <div className="mt-8 flex justify-center text-text-ash">
                  <p className="text-sm">
                    Haven&apos;t got an account?{" "}
                    <button
                      type="button"
                      onClick={() => router.push("/auth/signup/1")}
                      className="font-semibold text-main-green hover:text-main-green hover:underline cursor-pointer"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
