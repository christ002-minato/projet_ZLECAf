import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { COUNTRIES, CountryConfig } from "../data/countries";
import { motion } from "motion/react";
import { Search, Globe, ChevronRight } from "lucide-react";

export const SplashCountrySelect: React.FC = () => {
  const { changeCountry } = useApp();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCountries = COUNTRIES.filter((c) => {
    const term = searchTerm.toLowerCase();
    return (
      c.nameFr.toLowerCase().includes(term) ||
      c.nameEn.toLowerCase().includes(term) ||
      c.id.toLowerCase().includes(term)
    );
  });

  const getLanguageLabel = (lang: string) => {
    switch (lang) {
      case "fr":
        return "Français";
      case "en":
        return "English";
      case "ar":
        return "العربية";
      case "es":
        return "Español";
      default:
        return lang;
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 flex flex-col justify-between p-4 md:p-8 relative overflow-hidden font-sans">
      {/* Abstract Background Design */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Header section with brand name and AfCFTA connection */}
      <header className="max-w-4xl mx-auto w-full text-center pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 text-xs font-mono mb-4 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          ZLECAf / AfCFTA B2B REGIONAL COOPERATION
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-sans font-extrabold tracking-tight text-slate-900 mb-3"
          id="splash-title"
        >
          AfriMarket <span className="text-emerald-600">Connect</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-500 text-xs md:text-sm max-w-xl mx-auto"
        >
          La plateforme d'échange B2B continentale conçue pour favoriser le commerce intra-africain en franchise de droits.
        </motion.p>
      </header>

      {/* Central Interactive Selector Card */}
      <main className="max-w-4xl mx-auto w-full bg-white border border-slate-200 rounded-2xl p-6 md:p-8 flex-grow flex flex-col shadow-xl my-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-5">
          <div>
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-600" />
              Sélectionnez votre pays d'opération
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Cette étape initialise les tarifs préférentiels ZLECAf et la langue par défaut de votre interface.
            </p>
          </div>

          {/* Elegant Search Input */}
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher un pays..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-emerald-600 rounded-full py-2 pl-9 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/10 transition-all"
              id="country-search-input"
            />
          </div>
        </div>

        {/* Flag grid of African countries */}
        <div className="flex-grow overflow-y-auto max-h-[380px] pr-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 custom-scrollbar">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country, index) => (
              <motion.button
                key={country.id}
                onClick={() => changeCountry(country.id)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.015, 0.4) }}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 p-3.5 bg-white hover:bg-slate-50/50 border border-slate-200/80 hover:border-slate-400 rounded-xl text-left transition-all group shadow-sm hover:shadow"
                id={`country-btn-${country.id}`}
              >
                <span className="text-3xl filter drop-shadow-sm" role="img" aria-label={country.nameFr}>
                  {country.flag}
                </span>
                <div className="min-w-0 flex-grow">
                  <div className="text-xs font-bold text-slate-800 truncate group-hover:text-emerald-600 transition-colors">
                    {country.nameFr}
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    {getLanguageLabel(country.defaultLang)}
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-600 transition-colors ml-auto flex-shrink-0" />
              </motion.button>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-400 text-xs">
              Aucun pays membre trouvé pour "{searchTerm}".
            </div>
          )}
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="max-w-4xl mx-auto w-full text-center py-4 border-t border-slate-200/60 mt-4">
        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold">
          Secrétariat de la ZLECAf / AfCFTA Secretariat — Tous droits réservés &copy; 2026
        </p>
      </footer>
    </div>
  );
};
