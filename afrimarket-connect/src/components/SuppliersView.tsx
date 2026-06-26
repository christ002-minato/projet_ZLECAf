import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { useTranslation } from "react-i18next";
import { COUNTRIES } from "../data/countries";
import { Product } from "../data/products";
import { ProductDetailModal } from "./ProductDetailModal";
import { Filter, Search, Award, Star, Mail, MapPin, Building, CheckCircle2 } from "lucide-react";

export const SuppliersView: React.FC = () => {
  const { products, registeredSuppliers, selectedLanguage } = useApp();
  const { t } = useTranslation();
  
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>("all");
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeProductForModal, setActiveProductForModal] = useState<Product | null>(null);
  const [contactSuccessMessage, setContactSuccessMessage] = useState<string | null>(null);

  // 1. Structure all suppliers by combining base products and user registered suppliers
  const baseSuppliers = Array.from(new Set(products.map(p => p.supplierName))).map(name => {
    // Find first product of this supplier to get country and sector details
    const firstProduct = products.find(p => p.supplierName === name)!;
    return {
      name,
      countryId: firstProduct.countryId,
      sector: firstProduct.categoryFr,
      sectorEn: firstProduct.categoryEn,
      hasCertOfOrigin: firstProduct.compliesWithAfCFTA,
      rating: firstProduct.rating,
      isUserRegistered: false
    };
  });

  const userSuppliers = registeredSuppliers.map(s => ({
    name: s.name,
    countryId: s.countryId,
    sector: s.sector,
    sectorEn: s.sector === "Agriculture" ? "Agriculture & Food" : s.sector, // adjust
    hasCertOfOrigin: s.hasCertOfOrigin,
    rating: 5.0,
    isUserRegistered: true
  }));

  const allSuppliers = [...userSuppliers, ...baseSuppliers];

  const getCountryName = (countryId: string) => {
    const c = COUNTRIES.find(cnt => cnt.id === countryId);
    return selectedLanguage === "fr" ? c?.nameFr : c?.nameEn;
  };

  const getCountryFlag = (countryId: string) => {
    const c = COUNTRIES.find(cnt => cnt.id === countryId);
    return c?.flag || "🌍";
  };

  // Filter suppliers list
  const filteredSuppliers = allSuppliers.filter(s => {
    const sName = s.name.toLowerCase();
    const sCountry = (getCountryName(s.countryId) || "").toLowerCase();
    const query = searchTerm.toLowerCase();

    const matchesSearch = sName.includes(query) || sCountry.includes(query);
    const matchesCountry = selectedCountryFilter === "all" ? true : s.countryId === selectedCountryFilter;
    
    // Sector filtering check
    let matchesSector = true;
    if (selectedSectorFilter !== "all") {
      const sect = selectedSectorFilter.toLowerCase();
      matchesSector = s.sector.toLowerCase().includes(sect) || s.sectorEn.toLowerCase().includes(sect);
    }

    return matchesSearch && matchesCountry && matchesSector;
  });

  // Extract list of countries that actually have active suppliers
  const activeCountriesList = Array.from(new Set(allSuppliers.map(s => s.countryId)))
    .map(id => COUNTRIES.find(c => c.id === id))
    .filter(Boolean) as typeof COUNTRIES;

  const handleContactSupplierDirect = (supplierName: string) => {
    setContactSuccessMessage(supplierName);
    setTimeout(() => setContactSuccessMessage(null), 4000);
  };

  return (
    <div className="space-y-6 font-sans pb-16">
      
      {/* Intro section */}
      <div>
        <h1 className="text-2xl font-bold font-sans text-slate-900 tracking-tight flex items-center gap-2">
          🏢 {t('fournisseurs')} ZLECAf / AfCFTA
        </h1>
        <p className="text-slate-500 text-xs md:text-sm">
          {selectedLanguage === "fr"
            ? "Découvrez l'annuaire certifié des producteurs, coopératives et industries d'Afrique habilités à exporter en franchise de droits."
            : "Explore the certified directory of African manufacturers, cooperatives, and mills approved for duty-free exports."}
        </p>
      </div>

      {/* Grid Filter Panel */}
      <section className="bg-white rounded-xl p-4 md:p-6 border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Rechercher</label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Ex: Dakar, Abidjan, Casa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-3 text-xs focus:outline-none focus:border-amber-500"
              id="supplier-search-input"
            />
          </div>
        </div>

        {/* Filter by Country */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pays d'origine</label>
          <select
            value={selectedCountryFilter}
            onChange={(e) => setSelectedCountryFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-amber-500 font-medium"
            id="supplier-country-filter"
          >
            <option value="all">{t('all_countries')}</option>
            {activeCountriesList.map(c => (
              <option key={c.id} value={c.id}>
                {c.flag} {c.nameFr}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Sector */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Secteur Industriel</label>
          <select
            value={selectedSectorFilter}
            onChange={(e) => setSelectedSectorFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-amber-500 font-medium"
            id="supplier-sector-filter"
          >
            <option value="all">Tous les secteurs B2B</option>
            <option value="Agriculture">🌾 Agriculture & Agroalimentaire</option>
            <option value="Textile">🧵 Textile & Mode</option>
            <option value="Construction">🧱 Matériaux de Construction</option>
            <option value="Chimie">🧪 Produits Chimiques & Cosmétiques</option>
            <option value="Technologie">⚡ Électronique & Technologie</option>
          </select>
        </div>
      </section>

      {/* Direct Contact Success Banner */}
      {contactSuccessMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs flex items-center gap-2.5 animate-pulse">
          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0" />
          <span>
            Canal de communication B2B sécurisé établi avec <strong className="font-bold">{contactSuccessMessage}</strong>. Un message de pré-qualification commerciale contenant vos coordonnées d'origine a été envoyé.
          </span>
        </div>
      )}

      {/* Suppliers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSuppliers.length > 0 ? (
          filteredSuppliers.map((supplier) => {
            // Find products manufactured by this supplier
            const supplierProducts = products.filter(p => p.supplierName === supplier.name);
            const country = COUNTRIES.find(c => c.id === supplier.countryId);

            return (
              <div 
                key={supplier.name}
                className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden"
              >
                {/* Visual user sticker */}
                {supplier.isUserRegistered && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-lg">
                    Votre entreprise
                  </div>
                )}

                <div className="space-y-4">
                  
                  {/* Card Header */}
                  <div className="flex items-start gap-3">
                    <span className="text-3xl filter drop-shadow flex-shrink-0">{getCountryFlag(supplier.countryId)}</span>
                    <div className="min-w-0 flex-grow">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-bold text-slate-900 text-base leading-tight truncate">
                          {supplier.name}
                        </h3>
                        
                        {/* Rating stars */}
                        <div className="flex items-center gap-0.5 text-amber-500 text-xs">
                          <Star className="w-3 h-3 fill-amber-500" />
                          <span className="font-bold text-slate-700">{supplier.rating}</span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-400 font-mono uppercase mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {getCountryName(supplier.countryId)}
                      </div>
                    </div>
                  </div>

                  {/* Secteurs & Rules compliance label */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/50 flex items-center gap-1">
                      <Building className="w-3 h-3" />
                      {selectedLanguage === "fr" ? supplier.sector : (supplier.sectorEn || supplier.sector)}
                    </span>

                    {supplier.hasCertOfOrigin && (
                      <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-emerald-600" />
                        {t('conforme')}
                      </span>
                    )}
                  </div>

                  {/* Sub products section */}
                  <div className="space-y-1.5">
                    <h4 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                      {selectedLanguage === "fr" ? "CATALOGUE EXPORTATION" : "EXPORT CATALOGUE"}
                    </h4>
                    {supplierProducts.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {supplierProducts.map(p => (
                          <button
                            key={p.id}
                            onClick={() => setActiveProductForModal(p)}
                            className="text-left text-xs bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-md px-2.5 py-1.5 text-slate-700 font-medium truncate max-w-full block hover:text-amber-500 transition-colors"
                          >
                            📦 {selectedLanguage === "fr" ? p.nameFr : p.nameEn} — <span className="font-bold text-slate-900">${p.preferentialTariffUsd}</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400 italic">
                        {selectedLanguage === "fr" 
                          ? "Aucun produit n'a encore été mis en ligne pour cette entreprise."
                          : "No products uploaded for this company yet."}
                      </div>
                    )}
                  </div>

                </div>

                {/* Card Action footer */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">
                    STATUT: {supplier.hasCertOfOrigin ? "LABELLISÉ ZLECAf" : "INSCRIPTION STANDARD"}
                  </span>
                  
                  <button
                    onClick={() => handleContactSupplierDirect(supplier.name)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {t('contact_supplier')}
                  </button>
                </div>

              </div>
            );
          })
        ) : (
          <div className="col-span-full bg-white rounded-xl border border-dashed border-slate-200 p-12 text-center text-slate-400 text-sm">
            Aucun fournisseur ne correspond aux critères de recherche actuels.
          </div>
        )}
      </div>

      {/* Modal Trigger */}
      {activeProductForModal && (
        <ProductDetailModal 
          product={activeProductForModal} 
          onClose={() => setActiveProductForModal(null)} 
        />
      )}

    </div>
  );
};
