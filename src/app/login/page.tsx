"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Lock,
  Mail,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  User,
  Users,
  Calculator,
  Library,
  Sparkles,
  Eye,
  EyeOff,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DEMO_PERSONAS } from "@/lib/auth/demo-users";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [activePersonaLoading, setActivePersonaLoading] = useState<string | null>(null);

  const getPersonaIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="h-5 w-5 text-indigo-600" />;
      case "GraduationCap":
        return <GraduationCap className="h-5 w-5 text-blue-600" />;
      case "BookOpen":
        return <BookOpen className="h-5 w-5 text-emerald-600" />;
      case "User":
        return <User className="h-5 w-5 text-teal-600" />;
      case "Users":
        return <Users className="h-5 w-5 text-purple-600" />;
      case "Calculator":
        return <Calculator className="h-5 w-5 text-amber-600" />;
      case "Library":
        return <Library className="h-5 w-5 text-rose-600" />;
      default:
        return <User className="h-5 w-5 text-blue-600" />;
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "auladinfo@gmail.com",
          name: "Md. Aulad Hossen",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "গুগল লগইন ব্যর্থ হয়েছে");
      }

      toast.success(data.message || "গুগল অ্যাকাউন্টের মাধ্যমে সফলভাবে লগইন সম্পন্ন হয়েছে!");
      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "গুগল লগইনে সমস্যা হয়েছে";
      toast.error(msg);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleDemoLogin = async (personaId: string) => {
    try {
      setActivePersonaLoading(personaId);
      const res = await fetch("/api/auth/demo-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personaId }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "লগইন ব্যর্থ হয়েছে");
      }

      toast.success(data.message);
      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "লগইন ব্যর্থ হয়েছে";
      toast.error(msg);
    } finally {
      setActivePersonaLoading(null);
    }
  };

  const isDemo =
    process.env.NEXT_PUBLIC_DEMO_MODE_ENABLED === "true" ||
    process.env.NEXT_PUBLIC_APP_MODE === "demo";

  const handleStandardLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("অনুগ্রহ করে ইমেইল ও পাসওয়ার্ড প্রদান করুন।");
      return;
    }
    setLoading(true);
    try {
      if (isDemo) {
        await handleDemoLogin("demo-admin");
        return;
      }

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "লগইন ব্যর্থ হয়েছে");
      }

      toast.success(data.message || "সফলভাবে লগইন সম্পন্ন হয়েছে!");
      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "লগইন ব্যর্থ হয়েছে";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/25 to-indigo-50/35 text-slate-900 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />


      <div className="flex-1 flex flex-col justify-center py-8 sm:py-12 px-3 sm:px-6 lg:px-8 relative z-10">
        {/* School Logo & Title Header */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2.5 mb-2">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform shrink-0">
              <GraduationCap className="h-7 w-7" />
            </div>
            <div className="text-left">
              <span className="text-xl font-extrabold text-slate-900 block leading-tight tracking-tight">
                অগ্রদূত আদর্শ উচ্চ বিদ্যালয়
              </span>
              <span className="text-xs text-blue-600 font-bold block">সমন্বিত ইআরপি প্ল্যাটফর্ম</span>
            </div>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 pt-1">
            ইআরপি ড্যাশবোর্ডে প্রবেশ করুন
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            বিদ্যালয় শিক্ষক, কর্মকর্তা, শিক্ষার্থী ও অভিভাবক নিরাপদ পোর্টাল
          </p>
        </div>

        {/* Main Content Grid */}
        <div className={`mt-6 sm:mt-8 sm:mx-auto w-full ${isDemo ? "sm:max-w-4xl" : "sm:max-w-md"} px-1 sm:px-0`}>
          <div className={isDemo ? "grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start" : "w-full"}>
            {/* Standard Credentials & Google Login Form */}
            <div className={isDemo ? "lg:col-span-5" : "w-full"}>
              <Card className="shadow-xl shadow-blue-500/5 border border-slate-200/90 bg-white rounded-2xl overflow-hidden relative">
                {/* Top subtle decorative accent line */}
                <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

                <CardHeader className="pb-3 pt-5">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-lg font-bold text-slate-900">
                      সরাসরি অ্যাকাউন্টে প্রবেশ
                    </CardTitle>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
                      <ShieldCheck className="h-3 w-3 text-emerald-600" />
                      SSL সুরক্ষিত
                    </span>
                  </div>
                  <CardDescription>
                    আপনার প্রাতিষ্ঠানিক আইডি অথবা গুগল অ্যাকাউন্ট ব্যবহার করুন
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 pt-1">
                  {/* Google Login Button */}
                  <div>
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      disabled={googleLoading || loading}
                      className="w-full py-2.5 px-4 bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-800 font-bold rounded-xl shadow-2xs hover:shadow-sm active:scale-[0.99] transition-all flex items-center justify-center text-xs sm:text-sm gap-2.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
                    >
                      {googleLoading ? (
                        <svg
                          className="animate-spin h-4 w-4 text-slate-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      ) : (
                        /* Official 4-color Google G Logo */
                        <svg className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          />
                        </svg>
                      )}
                      <span>Google দিয়ে প্রবেশ করুন</span>
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="relative flex items-center justify-center my-3">
                    <div className="border-t border-slate-200 w-full" />
                    <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                      অথবা ইমেইল দিয়ে
                    </span>
                  </div>

                  {/* Standard Form */}
                  <form onSubmit={handleStandardLogin} className="space-y-3.5">
                    {/* Email Input */}
                    <div className="space-y-1 text-left">
                      <label className="block text-xs sm:text-sm font-bold text-slate-700">
                        ইমেইল অ্যাড্রেস / ইউজার আইডি
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Mail className="h-4 w-4" />
                        </div>
                        <input
                          type="email"
                          placeholder="auladinfo@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex h-10 w-full rounded-xl border border-slate-300 bg-white pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900 shadow-2xs placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
                          required
                        />
                      </div>
                    </div>

                    {/* Password Input with Visibility Toggle */}
                    <div className="space-y-1 text-left">
                      <label className="block text-xs sm:text-sm font-bold text-slate-700">
                        গোপন পাসওয়ার্ড
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Lock className="h-4 w-4" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="flex h-10 w-full rounded-xl border border-slate-300 bg-white pl-9 pr-10 py-2 text-xs sm:text-sm text-slate-900 shadow-2xs placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                          aria-label={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Remember me & Forgot Password */}
                    <div className="flex items-center justify-between text-xs pt-0.5">
                      <label className="flex items-center gap-1.5 text-slate-600 cursor-pointer font-medium select-none">
                        <input
                          type="checkbox"
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          defaultChecked
                        />
                        <span>মনে রাখুন</span>
                      </label>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          toast.info("পাসওয়ার্ড সহায়তার জন্য সিস্টেম প্রশাসকের সাথে যোগাযোগ করুন।");
                        }}
                        className="text-blue-600 hover:text-blue-700 hover:underline font-semibold"
                      >
                        পাসওয়ার্ড ভুলে গেছেন?
                      </a>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full justify-center bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-md shadow-blue-500/20 py-2.5 rounded-xl transition-all"
                      isLoading={loading}
                    >
                      <Lock className="h-4 w-4 mr-1.5" />
                      লগইন করুন
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* In Demo Mode only: Quick Demo Switcher Strip */}
            {isDemo && (
              <div className="lg:col-span-7">
                <Card className="shadow-lg border-amber-300/80 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 rounded-2xl">
                  <CardHeader className="pb-3 border-b border-amber-100">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2 text-amber-900 font-extrabold text-base">
                        <Sparkles className="h-5 w-5 text-amber-500 animate-spin" />
                        <span>১-ক্লিকে ডেমো মোড অভিজ্ঞতা</span>
                      </div>
                      <span className="text-[11px] bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-full font-bold">
                        ৭টি ডেমো রোল উপলব্ধ
                      </span>
                    </div>
                    <CardDescription className="text-amber-900/80 font-medium">
                      কোন পাসওয়ার্ড ছাড়াই যেকোনো রোলের পূর্ণাঙ্গ ড্যাশবোর্ড তাৎক্ষণিক পরীক্ষা করুন:
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-2.5">
                    {DEMO_PERSONAS.map((persona) => {
                      const isCurrent = activePersonaLoading === persona.id;
                      return (
                        <div
                          key={persona.id}
                          className="p-3 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-400 hover:shadow-xs transition-all flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 shrink-0">
                              {getPersonaIcon(persona.avatarIcon)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-sm font-bold text-slate-900 truncate">{persona.nameBn}</h4>
                                <span className="text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.2 rounded-md shrink-0">
                                  {persona.titleBn}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 line-clamp-1">{persona.descriptionBn}</p>
                            </div>
                          </div>

                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleDemoLogin(persona.id)}
                            isLoading={isCurrent}
                            className="w-full sm:w-auto shrink-0 justify-center font-bold text-xs border border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors rounded-xl"
                          >
                            প্রবেশ <ArrowRight className="h-3 w-3 ml-0.5" />
                          </Button>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Support Help Line */}
        <div className="mt-8 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
          <span>লগইন সংক্রান্ত যেকোনো জটিলতায় বিদ্যালয় আইটি সাপোর্ট সেন্টারে যোগাযোগ করুন।</span>
        </div>
      </div>
    </div>
  );
}
