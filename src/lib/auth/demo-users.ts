import { UserRole } from "@/types";

export interface DemoPersona {
  id: string;
  role: UserRole;
  nameBn: string;
  email: string;
  titleBn: string;
  descriptionBn: string;
  avatarIcon: string;
}

export const DEMO_PERSONAS: DemoPersona[] = [
  {
    id: "demo-admin",
    role: "SCHOOL_ADMIN",
    nameBn: "অ্যাডমিন (বিদ্যালয় প্রশাসক)",
    email: "admin@school-demo.bd",
    titleBn: "সিস্টেম অ্যাডমিনিস্ট্রেটর",
    descriptionBn: "সম্পূর্ণ স্কুল ইআরপি নিয়ন্ত্রণ, সেটিংস ও ইউজার ম্যানেজমেন্ট",
    avatarIcon: "ShieldCheck",
  },
  {
    id: "demo-principal",
    role: "PRINCIPAL",
    nameBn: "ড. মোহাম্মদ আব্দুল্লাহ",
    email: "principal@school-demo.bd",
    titleBn: "প্রধান শিক্ষক / অধ্যক্ষ",
    descriptionBn: "একাডেমিক তদারকি, ফলাফল অনুমোদন, স্টাফ ও আর্থিক বিশ্লেষণ",
    avatarIcon: "GraduationCap",
  },
  {
    id: "demo-teacher",
    role: "CLASS_TEACHER",
    nameBn: "কাজী রফিকুল ইসলাম",
    email: "teacher@school-demo.bd",
    titleBn: "সিনিয়র গণিত ও শ্রেণি শিক্ষক (১০ম শ্রেণি)",
    descriptionBn: "হাজিরা গ্রহণ, মার্কস এন্ট্রি, বাড়ির কাজ ও ফলাফল প্রস্তুতকরণ",
    avatarIcon: "BookOpen",
  },
  {
    id: "demo-student",
    role: "STUDENT",
    nameBn: "সাদিয়া ইসলাম",
    email: "student@school-demo.bd",
    titleBn: "১০ম শ্রেণি (বিজ্ঞান বিভাগ, রোল: ০১)",
    descriptionBn: "ব্যক্তিগত ফলাফল, রুটিন, উপস্থিতি, মার্কশিট ও বেতন তথ্য",
    avatarIcon: "User",
  },
  {
    id: "demo-parent",
    role: "PARENT",
    nameBn: "মোঃ রফিকুল হাসান",
    email: "parent@school-demo.bd",
    titleBn: "অভিভাবক (সাদিয়ার পিতা)",
    descriptionBn: "সন্তানের দৈনিক হাজিরা, নোটিশ, পরীক্ষার ফলাফল ও বেতন পরিশোধ",
    avatarIcon: "Users",
  },
  {
    id: "demo-accountant",
    role: "ACCOUNTANT",
    nameBn: "মাহমুদুল হাসান",
    email: "accountant@school-demo.bd",
    titleBn: "প্রধান হিসাবরক্ষক",
    descriptionBn: "ফি কালেকশন, ইনভয়েস, বকেয়া রশিদ ও মাসিক আয়-ব্যয় হিসাব",
    avatarIcon: "Calculator",
  },
  {
    id: "demo-librarian",
    role: "LIBRARIAN",
    nameBn: "নাজমিন আক্তার",
    email: "librarian@school-demo.bd",
    titleBn: "গ্রন্থাগারিক (লাইব্রেরিয়ান)",
    descriptionBn: "বইয়ের ক্যাটালগ, বই ইস্যু ও জমা, জরিমানা ট্র্যাকিং",
    avatarIcon: "Library",
  },
];
