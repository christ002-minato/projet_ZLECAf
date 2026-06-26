import React, { createContext, useContext, useState, useEffect } from "react";
import i18n from "../i18n";
import { CountryConfig, COUNTRIES } from "../data/countries";
import { Product, PRODUCTS } from "../data/products";

export interface BarrierReport {
  id: string;
  countryId: string;
  type: string;
  description: string;
  location: string;
  date: string;
  status: "En attente" | "En cours d'examen" | "Résolu";
}

export interface SupplierRegistration {
  name: string;
  sector: string;
  regNumber: string;
  countryId: string;
  hasCertOfOrigin: boolean;
  registeredAt: string;
}

interface AppContextType {
  selectedCountry: CountryConfig | null;
  selectedLanguage: string;
  activeTab: 'home' | 'suppliers' | 'become-supplier' | 'report-barrier' | 'settings';
  products: Product[];
  barrierReports: BarrierReport[];
  registeredSuppliers: SupplierRegistration[];
  changeCountry: (countryId: string) => void;
  changeLanguage: (lang: string) => void;
  setActiveTab: (tab: 'home' | 'suppliers' | 'become-supplier' | 'report-barrier' | 'settings') => void;
  addBarrierReport: (report: Omit<BarrierReport, "id" | "date" | "status">) => void;
  registerSupplier: (supplier: Omit<SupplierRegistration, "registeredAt">) => void;
  resetApp: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial trade barrier reports for realistic AfCFTA B2B map
const INITIAL_BARRIERS: BarrierReport[] = [
  {
    id: "bar_1",
    countryId: "senegal",
    type: "Contrôles douaniers excessifs",
    description: "Retards de plus de 5 jours pour le dédouanement de cargaisons textiles au poste de Rosso.",
    location: "Poste Frontière de Rosso (Sénégal/Mauritanie)",
    date: "2026-06-20",
    status: "En cours d'examen"
  },
  {
    id: "bar_2",
    countryId: "cote_divoire",
    type: "Frais douaniers non-tarifaires",
    description: "Frais d'inspection sanitaires redondants appliqués aux coopératives de cacao à la frontière Est.",
    location: "Frontière Noé (Côte d'Ivoire/Ghana)",
    date: "2026-06-24",
    status: "En attente"
  },
  {
    id: "bar_3",
    countryId: "kenya",
    type: "Exigences de certificats redondants",
    description: "Refus temporaire d'homologation des normes phytosanitaires pour le thé noir malgré le certificat régional.",
    location: "Poste Frontière de Busia (Kenya/Ouganda)",
    date: "2026-06-18",
    status: "Résolu"
  },
  {
    id: "bar_4",
    countryId: "maroc",
    type: "Procédure administrative lourde",
    description: "Lenteur d'enregistrement pour les transitaires de pièces électroniques au Port de Tanger Med.",
    location: "Port Tanger Med",
    date: "2026-06-25",
    status: "En cours d'examen"
  },
  {
    id: "bar_5",
    countryId: "nigeria",
    type: "Tracas administratifs et escortes obligatoires",
    description: "Exigence d'escortes de sécurité payantes injustifiées pour les camions de ciment industriels.",
    location: "Frontière Seme (Nigeria/Bénin)",
    date: "2026-06-22",
    status: "En cours d'examen"
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCountry, setSelectedCountryState] = useState<CountryConfig | null>(() => {
    const saved = localStorage.getItem("afri_connect_country");
    if (saved) {
      const parsed = COUNTRIES.find(c => c.id === saved);
      return parsed || null;
    }
    return null;
  });

  const [selectedLanguage, setSelectedLanguageState] = useState<string>(() => {
    return localStorage.getItem("afri_connect_lang") || "fr";
  });

  const [activeTab, setActiveTab] = useState<'home' | 'suppliers' | 'become-supplier' | 'report-barrier' | 'settings'>('home');
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [barrierReports, setBarrierReports] = useState<BarrierReport[]>(INITIAL_BARRIERS);
  const [registeredSuppliers, setRegisteredSuppliers] = useState<SupplierRegistration[]>([]);

  // Apply colors dynamically on load or update
  useEffect(() => {
    if (selectedCountry) {
      const root = document.documentElement;
      root.style.setProperty("--color-primary", selectedCountry.colors.primary);
      root.style.setProperty("--color-secondary", selectedCountry.colors.secondary);
      root.style.setProperty("--color-accent", selectedCountry.colors.accent);
      root.style.setProperty("--color-text-on-primary", selectedCountry.colors.textOnPrimary);
    }
  }, [selectedCountry]);

  // Handle RTL layout and i18n sync
  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
    const isRtl = selectedLanguage === "ar";
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = selectedLanguage;
  }, [selectedLanguage]);

  const changeCountry = (countryId: string) => {
    const country = COUNTRIES.find(c => c.id === countryId);
    if (country) {
      setSelectedCountryState(country);
      localStorage.setItem("afri_connect_country", country.id);

      // Auto load language corresponding to country, if no explicit language was manually saved
      const hasManualLang = localStorage.getItem("afri_connect_manual_lang") === "true";
      if (!hasManualLang) {
        changeLanguage(country.defaultLang);
        localStorage.setItem("afri_connect_manual_lang", "false");
      }
    }
  };

  const changeLanguage = (lang: string) => {
    setSelectedLanguageState(lang);
    localStorage.setItem("afri_connect_lang", lang);
    // Mark as manual override so country changing won't auto-revert their custom language choice
    localStorage.setItem("afri_connect_manual_lang", "true");
  };

  const addBarrierReport = (report: Omit<BarrierReport, "id" | "date" | "status">) => {
    const newReport: BarrierReport = {
      ...report,
      id: `bar_${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      status: "En attente"
    };
    setBarrierReports(prev => [newReport, ...prev]);
  };

  const registerSupplier = (supplier: Omit<SupplierRegistration, "registeredAt">) => {
    const newSupplier: SupplierRegistration = {
      ...supplier,
      registeredAt: new Date().toISOString().split("T")[0]
    };
    setRegisteredSuppliers(prev => [newSupplier, ...prev]);

    // Add a corresponding mock product in the local state list to make the app interactive!
    const productCategories: Record<string, {fr: string, en: string}> = {
      "Agriculture": { fr: "Agriculture & Agroalimentaire", en: "Agriculture & Food" },
      "Textile": { fr: "Textile & Mode", en: "Textiles & Fashion" },
      "Manufacture": { fr: "Matériaux de Construction", en: "Construction Materials" },
      "Technologie": { fr: "Électronique & Technologie", en: "Electronics & Tech" },
      "Chimie": { fr: "Produits Chimiques & Cosmétiques", en: "Chemicals & Cosmetics" }
    };

    const chosenCat = productCategories[supplier.sector] || { fr: "Agriculture & Agroalimentaire", en: "Agriculture & Food" };

    const newProduct: Product = {
      id: `prod_user_${Date.now()}`,
      nameFr: `Produits de ${supplier.name}`,
      nameEn: `${supplier.name} Wholesale Goods`,
      descriptionFr: `Marchandises B2B de haute qualité certifiées d'origine par ${supplier.name}.`,
      descriptionEn: `High quality B2B goods with registered origin certificate by ${supplier.name}.`,
      categoryFr: chosenCat.fr,
      categoryEn: chosenCat.en,
      supplierName: supplier.name,
      countryId: supplier.countryId,
      priceUsd: 1500,
      unitFr: "Lot commercial",
      unitEn: "Commercial batch",
      rating: 5.0,
      compliesWithAfCFTA: supplier.hasCertOfOrigin,
      preferentialTariffUsd: 1500,
      standardTariffUsd: 1800, // +20% external tariff simulating benefits
      leadTimeDays: 14,
      minOrderQuantity: 10,
      imageColor: "from-indigo-600 to-sky-500"
    };

    setProducts(prev => [newProduct, ...prev]);
  };

  const resetApp = () => {
    localStorage.clear();
    setSelectedCountryState(null);
    setSelectedLanguageState("fr");
    setActiveTab("home");
    setProducts(PRODUCTS);
    setBarrierReports(INITIAL_BARRIERS);
    setRegisteredSuppliers([]);
    document.documentElement.dir = "ltr";
  };

  return (
    <AppContext.Provider
      value={{
        selectedCountry,
        selectedLanguage,
        activeTab,
        products,
        barrierReports,
        registeredSuppliers,
        changeCountry,
        changeLanguage,
        setActiveTab,
        addBarrierReport,
        registerSupplier,
        resetApp
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
