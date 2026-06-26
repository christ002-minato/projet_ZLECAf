import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { useTranslation } from "react-i18next";
import { COUNTRIES, CountryConfig } from "../data/countries";
import { Globe, RefreshCw, ChevronDown, Award, AlertTriangle, ShieldCheck, Home, Users } from "lucide-react";

export const Header: React.FC = () => {
  const {
    selectedCountry,
    selectedLanguage,
    activeTab,
    changeCountry,
    changeLanguage,
    setActiveTab,
    resetApp
  } = useApp();

  const { t } = useTranslation();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

  if (!selectedCountry) return null;

  const languages = [
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "ar", label: "العربية", flag: "🇲🇦" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" }
  ];

  const currentLanguageLabel = languages.find(l => l.code === selectedLanguage)?.label || selectedLanguage;

  const handleLanguageChange = (code: string) => {
    changeLanguage(code);
    setLangDropdownOpen(false);
  };

  const handleCountryChange = (id: string) => {
    changeCountry(id);
    setCountryDropdownOpen(false);
  };

  return (
    <header 
      className="sticky top-0 z-40 bg-white border-b border-slate-200/80 text-slate-800 shadow-sm transition-all duration-500 font-sans"
      id="app-header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & AfCFTA Indicator */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2 font-bold text-lg md:text-xl tracking-tight focus:outline-none hover:opacity-90 transition-opacity"
              id="header-logo-btn"
            >
              <span className="text-2xl">🌍</span>
              <span className="font-sans font-extrabold text-slate-900">
                AfriMarket <span style={{ color: "var(--color-primary)" }}>Connect</span>
              </span>
            </button>
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 bg-slate-100 rounded-full border border-slate-200 text-[10px] font-mono font-bold tracking-wider uppercase text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              ZLECAf Compliant
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-6 h-16" aria-label="Main Navigation">
            <button
              onClick={() => setActiveTab('home')}
              className={`h-16 flex items-center border-b-2 text-xs uppercase tracking-wider font-bold transition-all gap-1.5 focus:outline-none ${
                activeTab === 'home' 
                  ? 'border-[var(--color-primary)] font-extrabold' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-200'
              }`}
              style={activeTab === 'home' ? { color: "var(--color-primary)" } : {}}
              id="nav-tab-home"
            >
              <Home className="w-4 h-4" />
              {t('home')}
            </button>
            
            <button
              onClick={() => setActiveTab('suppliers')}
              className={`h-16 flex items-center border-b-2 text-xs uppercase tracking-wider font-bold transition-all gap-1.5 focus:outline-none ${
                activeTab === 'suppliers' 
                  ? 'border-[var(--color-primary)] font-extrabold' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-200'
              }`}
              style={activeTab === 'suppliers' ? { color: "var(--color-primary)" } : {}}
              id="nav-tab-suppliers"
            >
              <Users className="w-4 h-4" />
              {t('fournisseurs')}
            </button>

            <button
              onClick={() => setActiveTab('become-supplier')}
              className={`h-16 flex items-center border-b-2 text-xs uppercase tracking-wider font-bold transition-all gap-1.5 focus:outline-none ${
                activeTab === 'become-supplier' 
                  ? 'border-[var(--color-primary)] font-extrabold' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-200'
              }`}
              style={activeTab === 'become-supplier' ? { color: "var(--color-primary)" } : {}}
              id="nav-tab-become-supplier"
            >
              <Award className="w-4 h-4" />
              {t('devenir_fournisseur')}
            </button>

            <button
              onClick={() => setActiveTab('report-barrier')}
              className={`h-16 flex items-center border-b-2 text-xs uppercase tracking-wider font-bold transition-all gap-1.5 focus:outline-none ${
                activeTab === 'report-barrier' 
                  ? 'border-[var(--color-primary)] font-extrabold' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-200'
              }`}
              style={activeTab === 'report-barrier' ? { color: "var(--color-primary)" } : {}}
              id="nav-tab-report-barrier"
            >
              <AlertTriangle className="w-4 h-4" />
              {t('signaler_barriere')}
            </button>
          </nav>

          {/* Right Area: Interactive Country and Language Overrides */}
          <div className="flex items-center gap-2">
            
            {/* Country Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setCountryDropdownOpen(!countryDropdownOpen);
                  setLangDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 active:bg-slate-200/80 rounded-lg text-xs font-bold border border-slate-200 text-slate-700 transition-colors focus:outline-none"
                id="header-country-selector"
              >
                <span className="text-xl filter drop-shadow-sm">{selectedCountry.flag}</span>
                <span className="hidden sm:inline truncate max-w-[80px] font-bold uppercase">{selectedCountry.id.substring(0, 2)}</span>
                <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform ${countryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {countryDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-60 max-h-80 overflow-y-auto bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 py-1.5 z-50 custom-scrollbar animate-fade-in-down"
                  id="header-country-dropdown"
                >
                  <div className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                    {t('changer_pays')}
                  </div>
                  {COUNTRIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleCountryChange(c.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-xs text-left hover:bg-slate-50 transition-colors ${
                        c.id === selectedCountry.id ? 'bg-slate-50 font-bold text-emerald-600' : 'text-slate-700'
                      }`}
                    >
                      <span className="text-xl">{c.flag}</span>
                      <span className="truncate">{c.nameFr}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector Dropdown with globe icon */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setCountryDropdownOpen(false);
                }}
                className="flex items-center gap-1 p-2 bg-slate-50 hover:bg-slate-100 active:bg-slate-200/80 rounded-lg text-xs font-bold border border-slate-200 text-slate-700 transition-colors focus:outline-none"
                id="header-lang-selector"
                aria-label={t('changer_langue')}
              >
                <Globe className="w-4 h-4 text-slate-500" />
                <span className="hidden md:inline uppercase text-xs font-bold">{selectedLanguage}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {langDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-44 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 py-1.5 z-50 animate-fade-in-down"
                  id="header-lang-dropdown"
                >
                  <div className="px-3 py-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                    {t('changer_langue')}
                  </div>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleLanguageChange(l.code)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left hover:bg-slate-50 transition-colors ${
                        l.code === selectedLanguage ? 'bg-slate-50 font-bold text-emerald-600' : 'text-slate-700'
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Config Quick Button (opens settings tab) */}
            <button
              onClick={() => setActiveTab('settings')}
              className={`p-2 rounded-lg transition-colors border ${
                activeTab === 'settings' 
                  ? 'bg-slate-100 border-slate-300 text-slate-800' 
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
              id="header-settings-btn"
              title={t('parametres')}
            >
              <span className="text-sm">⚙️</span>
            </button>

          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex items-center justify-around h-11 border-t border-slate-100 text-[11px] font-bold text-slate-600">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-1.5 py-2 px-1 border-b-2 transition-all ${
              activeTab === 'home' ? 'border-[var(--color-primary)] font-extrabold' : 'border-transparent text-slate-500'
            }`}
            style={activeTab === 'home' ? { color: "var(--color-primary)" } : {}}
          >
            {t('home')}
          </button>
          <button
            onClick={() => setActiveTab('suppliers')}
            className={`flex items-center gap-1.5 py-2 px-1 border-b-2 transition-all ${
              activeTab === 'suppliers' ? 'border-[var(--color-primary)] font-extrabold' : 'border-transparent text-slate-500'
            }`}
            style={activeTab === 'suppliers' ? { color: "var(--color-primary)" } : {}}
          >
            {t('fournisseurs')}
          </button>
          <button
            onClick={() => setActiveTab('become-supplier')}
            className={`flex items-center gap-1.5 py-2 px-1 border-b-2 transition-all ${
              activeTab === 'become-supplier' ? 'border-[var(--color-primary)] font-extrabold' : 'border-transparent text-slate-500'
            }`}
            style={activeTab === 'become-supplier' ? { color: "var(--color-primary)" } : {}}
          >
            {t('devenir_fournisseur')}
          </button>
          <button
            onClick={() => setActiveTab('report-barrier')}
            className={`flex items-center gap-1.5 py-2 px-1 border-b-2 transition-all ${
              activeTab === 'report-barrier' ? 'border-[var(--color-primary)] font-extrabold' : 'border-transparent text-slate-500'
            }`}
            style={activeTab === 'report-barrier' ? { color: "var(--color-primary)" } : {}}
          >
            {t('signaler_barriere')}
          </button>
        </div>

      </div>
    </header>
  );
};
