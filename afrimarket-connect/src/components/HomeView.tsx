import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { useTranslation } from "react-i18next";
import { Product } from "../data/products";
import { COUNTRIES } from "../data/countries";
import { ProductDetailModal } from "./ProductDetailModal";
import { Search, MapPin, BadgePercent, ChevronRight, Award, HelpCircle, ArrowRight, Zap, ListFilter } from "lucide-react";

export const HomeView: React.FC = () => {
  const { products, selectedCountry, selectedLanguage, setActiveTab } = useApp();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeProductForModal, setActiveProductForModal] = useState<Product | null>(null);

  if (!selectedCountry) return null;

  const getCountryName = (countryId: string) => {
    const c = COUNTRIES.find(cnt => cnt.id === countryId);
    return selectedLanguage === "fr" ? c?.nameFr : c?.nameEn;
  };

  const getCountryFlag = (countryId: string) => {
    const c = COUNTRIES.find(cnt => cnt.id === countryId);
    return c?.flag || "🌍";
  };

  // 1. Filter products based on search query and selected category
  const filteredProducts = products.filter(p => {
    const pName = (selectedLanguage === "fr" ? p.nameFr : p.nameEn).toLowerCase();
    const pDesc = (selectedLanguage === "fr" ? p.descriptionFr : p.descriptionEn).toLowerCase();
    const pCat = (selectedLanguage === "fr" ? p.categoryFr : p.categoryEn).toLowerCase();
    const cName = (getCountryName(p.countryId) || "").toLowerCase();
    const query = searchQuery.toLowerCase();

    const matchesSearch = pName.includes(query) || pDesc.includes(query) || pCat.includes(query) || cName.includes(query) || p.supplierName.toLowerCase().includes(query);
    const matchesCategory = selectedCategory ? (p.categoryFr === selectedCategory || p.categoryEn === selectedCategory) : true;

    return matchesSearch && matchesCategory;
  });

  // 2. Separate products: local priority vs other African countries
  const localProducts = filteredProducts.filter(p => p.countryId === selectedCountry.id);
  const otherProducts = filteredProducts.filter(p => p.countryId !== selectedCountry.id);

  // Dynamic B2B categories list
  const categories = selectedLanguage === "fr" ? [
    { name: "Agriculture & Agroalimentaire", icon: "🌾" },
    { name: "Textile & Mode", icon: "🧵" },
    { name: "Électronique & Technologie", icon: "⚡" },
    { name: "Matériaux de Construction", icon: "🧱" },
    { name: "Produits Chimiques & Cosmétiques", icon: "🧪" }
  ] : [
    { name: "Agriculture & Food", icon: "🌾" },
    { name: "Textiles & Fashion", icon: "🧵" },
    { name: "Electronics & Tech", icon: "⚡" },
    { name: "Construction Materials", icon: "🧱" },
    { name: "Chemicals & Cosmetics", icon: "🧪" }
  ];

  const handleCategoryClick = (catName: string) => {
    if (selectedCategory === catName) {
      setSelectedCategory(null); // toggle reset
    } else {
      setSelectedCategory(catName);
    }
  };

  const getCategoryEmoji = (cat: string) => {
    if (cat.includes("Textile") || cat.includes("Mode")) return "🧵";
    if (cat.includes("Agri") || cat.includes("Alimentaire") || cat.includes("Food")) return "🌾";
    if (cat.includes("Électronique") || cat.includes("Tech")) return "⚡";
    if (cat.includes("Matériaux") || cat.includes("Construction")) return "🧱";
    if (cat.includes("Chimiques") || cat.includes("Cosmétiques") || cat.includes("Chemicals")) return "🧪";
    return "📦";
  };

  return (
    <div className="space-y-8 font-sans pb-16">
      
      {/* Dynamic Hero Banner with National Accent Colors */}
      <section 
        style={{ borderLeftColor: "var(--color-primary)" }}
        className="bg-white text-slate-800 rounded-2xl p-6 md:p-10 border-l-4 border-y border-r border-slate-200/80 shadow-md relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[var(--color-primary)]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold text-slate-600 shadow-sm">
            <span className="text-sm">{selectedCountry.flag}</span>
            {selectedLanguage === "fr" ? `Hub ZLECAf actif : ${selectedCountry.nameFr}` : `Active AfCFTA Hub: ${selectedCountry.nameEn}`}
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-slate-900">
            {selectedLanguage === "fr" 
              ? "Accélérez vos approvisionnements en franchise de douane" 
              : "Accelerate Your Sourcing with zero import duties"}
          </h1>

          <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">
            {selectedLanguage === "fr"
              ? "AfriMarket Connect supprime l'intermédiation étrangère et calcule automatiquement vos abattements de tarifs douaniers selon les directives de l'Union africaine."
              : "AfriMarket Connect removes third-party foreign intermediaries and calculates your regional tariff reductions instantly based on African Union guidelines."}
          </p>

          <div className="pt-3 flex flex-wrap gap-3">
            <button 
              onClick={() => setActiveTab('become-supplier')}
              style={{ backgroundColor: "var(--color-primary)" }}
              className="text-white text-xs font-bold px-5 py-3 rounded-lg hover:opacity-95 shadow transition-all hover:-translate-y-0.5"
            >
              {t('devenir_fournisseur')}
            </button>
            <button 
              onClick={() => setActiveTab('report-barrier')}
              className="bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold px-5 py-3 rounded-lg border border-slate-200 transition-all shadow-sm"
            >
              {t('signaler_barriere')}
            </button>
          </div>
        </div>

        {/* Floating statistics widgets for AfCFTA relevance */}
        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-xl md:text-2xl font-black text-emerald-600 font-mono">0%</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold mt-0.5">Droits régionaux</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-xl md:text-2xl font-black text-amber-500 font-mono">54</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold mt-0.5">Pays connectés</div>
          </div>
          <div className="col-span-2 sm:col-span-1 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-xl md:text-2xl font-black text-sky-600 font-mono">1.3 Md$</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold mt-0.5">Marché intérieur</div>
          </div>
        </div>
      </section>

      {/* Advanced Search and Filter Utilities */}
      <section className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-slate-200/80 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={t('recherche')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 focus:border-[var(--color-primary)] rounded-full py-2.5 pl-10 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/10 transition-all"
            id="home-b2b-search-input"
          />
        </div>

        {/* Categories Pills Grid */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1 flex-shrink-0">
            <ListFilter className="w-3.5 h-3.5" />
            Secteurs :
          </span>
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
              !selectedCategory 
                ? 'bg-slate-950 text-white border-transparent' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {selectedLanguage === "fr" ? "Tout voir" : "All Categories"}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all border ${
                selectedCategory === cat.name 
                  ? 'bg-amber-500 text-slate-950 border-amber-600' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 1. PRIMARY LOCAL SUPPLIERS VIEW (Mandatory country highlight) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl filter drop-shadow-sm">{selectedCountry.flag}</span>
            <div>
              <h2 className="text-base font-bold font-sans text-slate-900 flex items-center gap-1.5">
                {t('local_priority')}
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                {selectedLanguage === "fr" 
                  ? "Achetez localement pour réduire l'empreinte carbone et optimiser les flux logistiques nationaux."
                  : "Buy locally to reduce carbon footprint and optimize national logistics streams."}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono bg-emerald-50 text-emerald-800 border border-emerald-100 font-bold px-2.5 py-1 rounded-full">
            {localProducts.length} {localProducts.length > 1 ? "produits" : "produit"}
          </span>
        </div>

        {localProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localProducts.map((product) => (
              <div 
                key={product.id}
                onClick={() => setActiveProductForModal(product)}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex flex-col justify-between"
              >
                {/* Visual Image container with theme gradient & category emoji */}
                <div className={`h-36 bg-gradient-to-tr ${product.imageColor} bg-opacity-10 flex items-center justify-center text-5xl border-b border-slate-100 relative`}>
                  <span className="filter drop-shadow">{getCategoryEmoji(product.categoryFr)}</span>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase text-emerald-800 border border-emerald-100/60">
                    Local Priority
                  </div>
                </div>
                
                <div className="p-4 space-y-2.5 flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                      {selectedLanguage === "fr" ? product.categoryFr : product.categoryEn}
                    </span>
                    <div className="flex items-center text-amber-500 text-xs font-bold gap-0.5">
                      ★ <span>{product.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-800 text-sm group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">
                    {selectedLanguage === "fr" ? product.nameFr : product.nameEn}
                  </h3>
                  
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {selectedLanguage === "fr" ? product.descriptionFr : product.descriptionEn}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    <span className="text-lg filter drop-shadow-sm">{getCountryFlag(product.countryId)}</span>
                    <span className="text-xs font-semibold text-slate-600 truncate">{product.supplierName}</span>
                  </div>
                </div>

                {/* Local Price Display */}
                <div className="bg-slate-50 px-4 py-3 border-t border-slate-100 flex items-center justify-between text-xs rounded-b-xl">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 block tracking-wider">TARIF INTRA-PAYS</span>
                    <span className="font-extrabold text-slate-800 text-sm">${product.preferentialTariffUsd.toLocaleString()} USD</span>
                  </div>
                  <span className="text-xs font-bold text-[var(--color-primary)] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    {t('comparateur_prix')} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-400 text-xs">
            {selectedLanguage === "fr" 
              ? `Aucun produit disponible pour le moment dans la catégorie sélectionnée au ${selectedCountry.nameFr}.`
              : `No local products available in the selected category for ${selectedCountry.nameEn} at this moment.`}
            <div className="mt-3">
              <button 
                onClick={() => setActiveTab('become-supplier')}
                className="text-xs font-bold text-[var(--color-primary)] hover:underline"
              >
                + Soyez le premier à enregistrer des produits au {selectedCountry.nameFr} !
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 2. REGIONAL AFRICAN UNION OFFERS (intra-African trade) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
          <div>
            <h2 className="text-base font-bold font-sans text-slate-900 flex items-center gap-1.5">
              🌍 {t('all_products')} (ZLECAf / AfCFTA)
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              {selectedLanguage === "fr"
                ? "Marchandises éligibles aux franchises douanières pour le commerce régional et transfrontalier."
                : "Eligible goods certified for zero-duty cross-border and regional trade."}
            </p>
          </div>
          <span className="text-xs font-mono bg-amber-50 text-amber-800 border border-amber-100 font-bold px-2.5 py-1 rounded-full">
            {otherProducts.length} {otherProducts.length > 1 ? "offres" : "offre"}
          </span>
        </div>

        {otherProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProducts.map((product) => {
              const unitSavings = product.standardTariffUsd - product.preferentialTariffUsd;
              const savingsPct = Math.round((unitSavings / product.standardTariffUsd) * 100);

              return (
                <div 
                  key={product.id}
                  onClick={() => setActiveProductForModal(product)}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex flex-col justify-between"
                >
                  {/* Visual Image container with theme gradient & category emoji */}
                  <div className={`h-36 bg-gradient-to-tr ${product.imageColor} bg-opacity-10 flex items-center justify-center text-5xl border-b border-slate-100 relative`}>
                    <span className="filter drop-shadow">{getCategoryEmoji(product.categoryFr)}</span>
                    <div className="absolute top-3 left-3 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase text-emerald-800">
                      Règle d'Origine OK
                    </div>
                  </div>

                  <div className="p-4 space-y-2.5 flex-grow">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                        {selectedLanguage === "fr" ? product.categoryFr : product.categoryEn}
                      </span>
                      <div className="flex items-center text-amber-500 text-xs font-bold gap-0.5">
                        ★ <span>{product.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-slate-800 text-sm group-hover:text-emerald-600 transition-colors line-clamp-1">
                      {selectedLanguage === "fr" ? product.nameFr : product.nameEn}
                    </h3>
                    
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {selectedLanguage === "fr" ? product.descriptionFr : product.descriptionEn}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="text-lg filter drop-shadow-sm">{getCountryFlag(product.countryId)}</span>
                        <span className="font-semibold text-slate-600 truncate max-w-[120px]">{product.supplierName}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase">{getCountryName(product.countryId)}</span>
                    </div>
                  </div>

                  {/* Regional Price Display */}
                  <div className="bg-slate-50 px-4 py-3 border-t border-slate-100 flex items-center justify-between text-xs rounded-b-xl">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 block tracking-wider">{t('preferential_price')}</span>
                      <span className="font-black text-slate-800 text-sm">${product.preferentialTariffUsd.toLocaleString()} USD</span>
                    </div>
                    
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                      -{savingsPct}% {selectedLanguage === "fr" ? "douane" : "duty"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-400 text-xs">
            {selectedLanguage === "fr" 
              ? "Aucun autre produit continental disponible correspondant à vos filtres."
              : "No other continental products available matching your active filters."}
          </div>
        )}
      </section>

      {/* B2B Educational Panel explaining Rules of Origin */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-4 shadow-sm">
        <div className="p-3 bg-slate-50 text-emerald-600 border border-slate-100 rounded-xl flex-shrink-0">
          <Award className="w-8 h-8" />
        </div>
        <div className="space-y-1.5">
          <h3 className="font-bold text-slate-950 text-sm flex items-center gap-2">
            {t('regle_origine')} : Comment ça marche ?
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            {selectedLanguage === "fr"
              ? "Pour bénéficier de l'exonération totale de droits de douane de la ZLECAf, un produit doit comporter une valeur ajoutée locale substantielle (généralement supérieure à 35% de transformation locale). Les produits vendus sur AfriMarket avec le badge de conformité ont été audités et validés par les comités nationaux de l'origine."
              : "To qualify for full AfCFTA duty-free access, a product must contain substantial local value-added components (generally over 35% local manufacturing transformation). Products listed with the compliance badge have been audited and validated by national committees on rules of origin."}
          </p>
          <div className="pt-1">
            <button 
              onClick={() => setActiveTab('become-supplier')}
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
            >
              Faire labelliser mon entreprise <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Active Modal */}
      {activeProductForModal && (
        <ProductDetailModal 
          product={activeProductForModal} 
          onClose={() => setActiveProductForModal(null)} 
        />
      )}

    </div>
  );
};
