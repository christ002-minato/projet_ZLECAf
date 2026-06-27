import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

export type Language = "fr" | "en" | "es" | "ar" | "pt";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────

export const translations = {
  // Navigation
  home: { fr: "Accueil", en: "Home", es: "Inicio", ar: "الرئيسية", pt: "Início" },
  products: { fr: "Produits", en: "Products", es: "Productos", ar: "المنتجات", pt: "Produtos" },
  suppliers: { fr: "Fournisseurs", en: "Suppliers", es: "Proveedores", ar: "الموردون", pt: "Fornecedores" },
  register: { fr: "Inscription", en: "Register", es: "Registro", ar: "التسجيل", pt: "Registro" },
  login: { fr: "Connexion", en: "Login", es: "Iniciar sesión", ar: "تسجيل الدخول", pt: "Entrar" },
  
  // Common
  search: { fr: "Rechercher ...", en: "Search ...", es: "Buscar ...", ar: "البحث عن المنتجات...", pt: "Pesquisar ..." },
  all: { fr: "Tout", en: "All", es: "Todo", ar: "الكل", pt: "Tudo" },
  taxFree: { fr: "Sans taxe", en: "Tax-free", es: "Sin impuestos", ar: "معفى من الضرائب", pt: "Sem impostos" },
  verified: { fr: "Vérifié", en: "Verified", es: "Verificado", ar: "موثق", pt: "Verificado" },
  view: { fr: "Voir", en: "View", es: "Ver", ar: "عرض", pt: "Ver" },
  contact: { fr: "Contacter", en: "Contact", es: "Contactar", ar: "اتصل", pt: "Contatar" },
  min: { fr: "min", en: "min", es: "mín", ar: "الحد الأدنى", pt: "mín" },
  
  // Categories
  agriculture: { fr: "Agriculture", en: "Agriculture", es: "Agricultura", ar: "الزراعة", pt: "Agricultura" },
  textile: { fr: "Textile", en: "Textile", es: "Textil", ar: "النسيج", pt: "Têxtil" },
  energie: { fr: "Énergie", en: "Energy", es: "Energía", ar: "الطاقة", pt: "Energia" },
  construction: { fr: "Construction", en: "Construction", es: "Construcción", ar: "البناء", pt: "Construção" },
  chimie: { fr: "Chimie", en: "Chemistry", es: "Química", ar: "الكيمياء", pt: "Química" },
  
  // Hero
  heroTitle: {
    fr: "Commerce Intra-Africain Sans Frontières",
    en: "Intra-African Trade Without Borders",
    es: "Comercio Intra-Africano Sin Fronteras",
    ar: "التجارة الأفريقية البينية بدون حدود",
    pt: "Comércio Intra-Africano Sem Fronteiras",
  },
  heroSubtitle: {
    fr: "Connectez-vous avec des fournisseurs vérifiés à travers 54 pays africains. Profitez d'échanges sans taxes grâce à la ZLECAf.",
    en: "Connect with verified suppliers across 54 African countries. Enjoy tax-free trade through AfCFTA.",
    es: "Conéctese con proveedores verificados en 54 países africanos. Disfrute del comercio sin impuestos a través de ZLECAf.",
    ar: "تواصل مع موردين موثوقين عبر 54 دولة أفريقية. استمتع بالتجارة المعفاة من الضرائب من خلال منطقة التجارة الحرة القارية الأفريقية.",
    pt: "Conecte-se com fornecedores verificados em 54 países africanos. Desfrute do comércio sem impostos através da ZLECAf.",
  },
  exploreProducts: {
    fr: "Explorer les produits",
    en: "Explore Products",
    es: "Explorar Productos",
    ar: "استكشاف المنتجات",
    pt: "Explorar Produtos",
  },
  
  // Supplier Profile
  supplierProfile: {
    fr: "Profil Fournisseur",
    en: "Supplier Profile",
    es: "Perfil del Proveedor",
    ar: "ملف المورد",
    pt: "Perfil do Fornecedor",
  },
  contactSupplier: {
    fr: "Contacter ce fournisseur",
    en: "Contact this supplier",
    es: "Contactar a este proveedor",
    ar: "اتصل بهذا المورد",
    pt: "Contatar este fornecedor",
  },
  supplierProducts: {
    fr: "Produits du fournisseur",
    en: "Supplier Products",
    es: "Productos del Proveedor",
    ar: "منتجات المورد",
    pt: "Produtos do Fornecedor",
  },
  productsCount: {
    fr: "produits",
    en: "products",
    es: "productos",
    ar: "منتجات",
    pt: "produtos",
  },
  memberSince: {
    fr: "Membre depuis",
    en: "Member since",
    es: "Miembro desde",
    ar: "عضو منذ",
    pt: "Membro desde",
  },
  rating: {
    fr: "Note",
    en: "Rating",
    es: "Calificación",
    ar: "التقييم",
    pt: "Avaliação",
  },
  
  // Supplier Types
  individual: { fr: "Particulier", en: "Individual", es: "Particular", ar: "فرد", pt: "Individual" },
  representative: { fr: "Représentant", en: "Representative", es: "Representante", ar: "ممثل", pt: "Representante" },
  company: { fr: "Entreprise", en: "Company", es: "Empresa", ar: "شركة", pt: "Empresa" },
  
  // Filters
  filterByCategory: {
    fr: "Filtrer par catégorie",
    en: "Filter by category",
    es: "Filtrar por categoría",
    ar: "تصفية حسب الفئة",
    pt: "Filtrar por categoria",
  },
  filterByCountry: {
    fr: "Filtrer par pays",
    en: "Filter by country",
    es: "Filtrar por país",
    ar: "تصفية حسب البلد",
    pt: "Filtrar por país",
  },
  searchSuppliers: {
    fr: "Rechercher des fournisseurs...",
    en: "Search suppliers...",
    es: "Buscar proveedores...",
    ar: "البحث عن الموردين...",
    pt: "Pesquisar fornecedores...",
  },
  
  // Footer stats
  stats: {
    fr: "Statistiques de la plateforme",
    en: "Platform Statistics",
    es: "Estadísticas de la Plataforma",
    ar: "إحصائيات المنصة",
    pt: "Estatísticas da Plataforma",
  },
  activeSuppliers: {
    fr: "Fournisseurs actifs",
    en: "Active Suppliers",
    es: "Proveedores Activos",
    ar: "الموردون النشطون",
    pt: "Fornecedores Ativos",
  },
  availableProducts: {
    fr: "Produits disponibles",
    en: "Available Products",
    es: "Productos Disponibles",
    ar: "المنتجات المتاحة",
    pt: "Produtos Disponíveis",
  },
  africanCountries: {
    fr: "Pays africains",
    en: "African Countries",
    es: "Países Africanos",
    ar: "البلدان الأفريقية",
    pt: "Países Africanos",
  },
  
  // Language selector
  selectLanguage: {
    fr: "Changer de langue",
    en: "Change language",
    es: "Cambiar idioma",
    ar: "تغيير اللغة",
    pt: "Mudar idioma",
  },
  
  // Not found
  notFound: {
    fr: "Page non trouvée",
    en: "Page not found",
    es: "Página no encontrada",
    ar: "الصفحة غير موجودة",
    pt: "Página não encontrada",
  },
  backToHome: {
    fr: "Retour à l'accueil",
    en: "Back to home",
    es: "Volver al inicio",
    ar: "العودة إلى الصفحة الرئيسية",
    pt: "Voltar ao início",
  },
};

export function t(key: keyof typeof translations, lang: Language): string {
  return translations[key][lang] || translations[key].en;
}

// ─── CONTEXT ──────────────────────────────────────────────────────────────────

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("afrimarket-language");
    return (saved as Language) || "fr";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("afrimarket-language", lang);
  };

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    document.documentElement.translate = false;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
