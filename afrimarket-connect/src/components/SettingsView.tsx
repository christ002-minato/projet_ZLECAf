import React from "react";
import { useApp } from "../context/AppContext";
import { useTranslation } from "react-i18next";
import { COUNTRIES } from "../data/countries";
import { Globe, RefreshCw, Layers, Sliders, Info, ShieldCheck, Check } from "lucide-react";

export const SettingsView: React.FC = () => {
  const {
    selectedCountry,
    selectedLanguage,
    changeCountry,
    changeLanguage,
    resetApp
  } = useApp();

  const { t } = useTranslation();

  if (!selectedCountry) return null;

  const languages = [
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "ar", label: "العربية", flag: "🇲🇦" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans pb-16">
      
      {/* View Header */}
      <div>
        <h1 className="text-2xl font-bold font-sans text-slate-900 tracking-tight flex items-center gap-2">
          ⚙️ {t('parametres')}
        </h1>
        <p className="text-slate-500 text-xs md:text-sm">
          Ajustez vos préférences géographiques et linguistiques de la ZLECAf pour personnaliser les tarifs de votre marché.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Side: General controls */}
        <div className="md:col-span-2 space-y-6">
          
          {/* 1. Country Switcher Section */}
          <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-sm font-bold tracking-wider text-slate-500 font-mono uppercase flex items-center gap-2 border-b border-slate-100 pb-2">
              <Layers className="w-4 h-4 text-amber-500" />
              {t('changer_pays')}
            </h2>
            <p className="text-xs text-slate-400">
              Changer de pays d'opération mettra immédiatement à jour la grille tarifaire douanière préférentielle et activera l'identité de marque nationale associée.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1.5 custom-scrollbar">
              {COUNTRIES.map((c) => {
                const isSelected = c.id === selectedCountry.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => changeCountry(c.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs text-left transition-all ${
                      isSelected 
                        ? "border-[var(--color-primary)] bg-slate-50 font-bold text-slate-900" 
                        : "border-slate-100 bg-white hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    <span className="text-lg filter drop-shadow">{c.flag}</span>
                    <span className="truncate flex-grow">{c.nameFr}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[var(--color-primary)] ml-auto flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Language Switcher Section */}
          <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-sm font-bold tracking-wider text-slate-500 font-mono uppercase flex items-center gap-2 border-b border-slate-100 pb-2">
              <Globe className="w-4 h-4 text-emerald-500" />
              {t('changer_langue')}
            </h2>
            <p className="text-xs text-slate-400">
              L'arabe (العربية) réorientera automatiquement l'intégralité du layout de la marketplace en lecture bidirectionnelle de Droite à Gauche (RTL).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {languages.map((l) => {
                const isSelected = l.code === selectedLanguage;
                return (
                  <button
                    key={l.code}
                    onClick={() => changeLanguage(l.code)}
                    className={`flex items-center gap-2.5 p-3 rounded-lg border text-xs text-left transition-all ${
                      isSelected 
                        ? "border-emerald-500 bg-emerald-50/40 font-bold text-slate-900" 
                        : "border-slate-100 bg-white hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 ml-auto" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Dangerous / Testing Tools Area */}
          <div className="bg-rose-50/40 border border-rose-100 rounded-xl p-6 space-y-4">
            <h2 className="text-sm font-bold tracking-wider text-rose-800 font-mono uppercase flex items-center gap-2">
              ⚠️ ZONE DE CONFIGURATION / TESTS
            </h2>
            <p className="text-xs text-rose-700">
              Vous testez la plateforme ? Ce bouton efface le localStorage, réinitialise la base de données locale des fournisseurs et relance l'écran de sélection de pays original (Splash Screen).
            </p>
            <div>
              <button
                onClick={resetApp}
                className="bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-md transition-all flex items-center gap-1.5"
                id="reset-app-btn"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Réinitialiser la simulation B2B
              </button>
            </div>
          </div>

        </div>

        {/* Right Side: Visual Analytics / Theme info */}
        <div className="space-y-6">
          
          {/* Theme card summary */}
          <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-mono flex items-center gap-1.5 pb-2 border-b border-slate-100">
              <Sliders className="w-4 h-4 text-indigo-500" />
              Charte Graphique Active
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Pays :</span>
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  <span>{selectedCountry.flag}</span>
                  <span>{selectedCountry.nameFr}</span>
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Couleur Primaire :</span>
                <div className="flex items-center gap-1.5">
                  <span 
                    style={{ backgroundColor: selectedCountry.colors.primary }}
                    className="w-4 h-4 rounded-full border border-slate-200" 
                  />
                  <span className="font-mono text-[10px] text-slate-700 uppercase">{selectedCountry.colors.primary}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Couleur Secondaire :</span>
                <div className="flex items-center gap-1.5">
                  <span 
                    style={{ backgroundColor: selectedCountry.colors.secondary }}
                    className="w-4 h-4 rounded-full border border-slate-200" 
                  />
                  <span className="font-mono text-[10px] text-slate-700 uppercase">{selectedCountry.colors.secondary}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Accent national :</span>
                <div className="flex items-center gap-1.5">
                  <span 
                    style={{ backgroundColor: selectedCountry.colors.accent }}
                    className="w-4 h-4 rounded-full border border-slate-200" 
                  />
                  <span className="font-mono text-[10px] text-slate-700 uppercase">{selectedCountry.colors.accent}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg text-[11px] leading-relaxed text-slate-500 mt-2">
                Ces nuances proviennent des couleurs officielles de l'Union Africaine ou du drapeau national du pays sélectionné.
              </div>
            </div>
          </div>

          {/* AfCFTA Information Panel */}
          <div className="bg-slate-900 text-white rounded-xl p-5 space-y-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/10 to-transparent pointer-events-none" />
            <h3 className="font-bold text-xs uppercase tracking-wider font-mono flex items-center gap-1.5 text-slate-200">
              <Info className="w-4 h-4 text-amber-400" />
              Indice ZLECAf
            </h3>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              La Zone de Libre-Échange Continentale Africaine réunit 54 des 55 États membres de l'Union africaine. Son objectif est d'éliminer les barrières tarifaires et non-tarifaires pour libérer le potentiel industriel du continent.
            </p>
            <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Secrétariat Général de la ZLECAf
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
