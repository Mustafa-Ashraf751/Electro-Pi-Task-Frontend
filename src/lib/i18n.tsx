import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Lang = "en" | "ar";

const dict = {
  en: {
    appName: "Yummly",
    tagline: "Delicious food, delivered fast",
    heroTitle: "Order food you love, delivered to your door",
    heroSubtitle: "From your favorite local restaurants — fresh, fast, and reliable.",
    searchPlaceholder: "Search restaurants or dishes…",
    categories: "Categories",
    popular: "Popular meals",
    featured: "Featured restaurants",
    login: "Log in",
    signup: "Sign up",
    home: "Home",
    restaurants: "Restaurants",
    orders: "Orders",
    profile: "Profile",
    cart: "Cart",
    addToCart: "Add to cart",
    viewMenu: "View menu",
    checkout: "Checkout",
    placeOrder: "Place order",
    promoCode: "Promo code",
    apply: "Apply",
    subtotal: "Subtotal",
    delivery: "Delivery",
    total: "Total",
    payment: "Payment method",
    card: "Credit Card",
    cod: "Cash on Delivery",
    address: "Delivery address",
    tracking: "Order tracking",
    estimated: "Estimated delivery",
    received: "Order received",
    preparing: "Preparing",
    onTheWay: "On the way",
    delivered: "Delivered",
    admin: "Admin",
    dashboard: "Dashboard",
  },
  ar: {
    appName: "يملي",
    tagline: "طعام لذيذ، يُوصل بسرعة",
    heroTitle: "اطلب الطعام الذي تحبه، يصل إلى بابك",
    heroSubtitle: "من مطاعمك المحلية المفضلة — طازج، سريع، وموثوق.",
    searchPlaceholder: "ابحث عن مطاعم أو أطباق…",
    categories: "الفئات",
    popular: "الوجبات الشائعة",
    featured: "مطاعم مميزة",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    home: "الرئيسية",
    restaurants: "المطاعم",
    orders: "الطلبات",
    profile: "الملف",
    cart: "السلة",
    addToCart: "أضف للسلة",
    viewMenu: "عرض القائمة",
    checkout: "الدفع",
    placeOrder: "إتمام الطلب",
    promoCode: "كود الخصم",
    apply: "تطبيق",
    subtotal: "المجموع الفرعي",
    delivery: "التوصيل",
    total: "الإجمالي",
    payment: "طريقة الدفع",
    card: "بطاقة ائتمان",
    cod: "الدفع عند الاستلام",
    address: "عنوان التوصيل",
    tracking: "تتبع الطلب",
    estimated: "التوصيل المتوقع",
    received: "تم استلام الطلب",
    preparing: "قيد التحضير",
    onTheWay: "في الطريق",
    delivered: "تم التوصيل",
    admin: "المسؤول",
    dashboard: "لوحة التحكم",
  },
} as const;

type Key = keyof typeof dict.en;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string; dir: "ltr" | "rtl" };
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved === "ar" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  return (
    <I18nContext.Provider
      value={{ lang, setLang, t: (k) => dict[lang][k], dir: lang === "ar" ? "rtl" : "ltr" }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
