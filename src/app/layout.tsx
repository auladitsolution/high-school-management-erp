import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "উচ্চ বিদ্যালয় ব্যবস্থাপনা ও শিক্ষা পোর্টাল",
  description: "বাংলাদেশের উচ্চ বিদ্যালয় সমূহের জন্য আধুনিক, সমন্বিত ও পূর্ণাঙ্গ স্কুল ম্যানেজমেন্ট ইআরপি সিস্টেম",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning className={`${hindSiliguri.variable} ${hindSiliguri.className} h-full antialiased`}>
      <body suppressHydrationWarning className={`${hindSiliguri.className} min-h-full flex flex-col text-slate-900 bg-slate-50`}>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
