import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { SplashCountrySelect } from "./components/SplashCountrySelect";
import { Header } from "./components/Header";
import { HomeView } from "./components/HomeView";
import { SuppliersView } from "./components/SuppliersView";
import { BecomeSupplierView } from "./components/BecomeSupplierView";
import { ReportBarrierView } from "./components/ReportBarrierView";
import { SettingsView } from "./components/SettingsView";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";

import "./i18n"; // import i18n setup

function MainLayout() {
  const { selectedCountry, activeTab, selectedLanguage } = useApp();
  const { t } = useTranslation();

  // If no country has been selected, force onboarding country picker first
  if (!selectedCountry) {
    return <SplashCountrySelect />;
  }

  // Render the appropriate view based on active tab state
  const renderActiveView = () => {
    switch (activeTab) {
      case "home":
        return <HomeView />;
      case "suppliers":
        return <SuppliersView />;
      case "become-supplier":
        return <BecomeSupplierView />;
      case "report-barrier":
        return <ReportBarrierView />;
      case "settings":
        return <SettingsView />;
      default:
        return <HomeView />;
    }
  };

  const isRtl = selectedLanguage === "ar";

  return (
    <div className={`min-h-screen bg-slate-50/50 text-slate-900 flex flex-col justify-between font-sans ${isRtl ? "rtl text-right" : "ltr text-left"}`}>
      
      {/* Dynamic Header */}
      <Header />

      {/* Main Container with slide fade transitions */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            id="tab-content-container"
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Modern B2B Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Branding & Mission */}
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🌍</span>
              <div>
                <span className="font-extrabold text-white text-sm">AfriMarket Connect</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Pour l'intégration et le commerce intra-africain.</p>
              </div>
            </div>

            {/* Links and regulations */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] text-slate-400 font-mono uppercase tracking-wider">
              <span>ACCRA ACQUISITIONS</span>
              <span>•</span>
              <span>ZLECAf RULES OF ORIGIN v2.0</span>
              <span>•</span>
              <span>UNION AFRICAINE PROTOCOLE</span>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-[10px] text-slate-500 font-medium">
                {t('all_rights')}
              </p>
              <p className="text-[9px] text-slate-600 font-mono mt-0.5 uppercase tracking-widest">
                Dakar • Abidjan • Cairo • Addis Ababa • Cape Town
              </p>
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
