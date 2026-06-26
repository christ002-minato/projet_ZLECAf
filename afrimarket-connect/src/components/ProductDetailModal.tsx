import React, { useState } from "react";
import { Product } from "../data/products";
import { COUNTRIES } from "../data/countries";
import { useTranslation } from "react-i18next";
import { useApp } from "../context/AppContext";
import { X, Award, Star, Truck, ShoppingBag, Mail, Send, CheckCircle2, DollarSign } from "lucide-react";

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { selectedLanguage } = useApp();
  const { t } = useTranslation();
  const [rfqSubmitted, setRfqSubmitted] = useState(false);
  const [rfqMessage, setRfqMessage] = useState("");
  const [rfqQty, setRfqQty] = useState(product.minOrderQuantity);

  const country = COUNTRIES.find(c => c.id === product.countryId);
  const isArabic = selectedLanguage === "ar";

  const productName = selectedLanguage === "fr" ? product.nameFr : product.nameEn;
  const productDesc = selectedLanguage === "fr" ? product.descriptionFr : product.descriptionEn;
  const productCat = selectedLanguage === "fr" ? product.categoryFr : product.categoryEn;
  const productUnit = selectedLanguage === "fr" ? product.unitFr : product.unitEn;

  // Calculate the total savings
  const unitSavings = product.standardTariffUsd - product.preferentialTariffUsd;
  const totalSavings = unitSavings * rfqQty;
  const savingsPct = Math.round((unitSavings / product.standardTariffUsd) * 100);

  const handleSendRfq = (e: React.FormEvent) => {
    e.preventDefault();
    setRfqSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
      <div 
        className="bg-white text-slate-900 rounded-2xl w-full max-w-4xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        id={`product-modal-${product.id}`}
      >
        
        {/* Left Side: Product Illustration & Basic Info */}
        <div className="md:w-5/12 bg-slate-50 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 bg-slate-200/50 px-2.5 py-1 rounded">
                {productCat}
              </span>
              
              <button 
                onClick={onClose}
                className="md:hidden p-1.5 hover:bg-slate-200 rounded-full transition-colors text-slate-500 focus:outline-none"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Custom high-end abstract visual placeholder */}
            <div className={`w-full aspect-square rounded-xl bg-gradient-to-tr ${product.imageColor} flex flex-col items-center justify-center text-white p-6 shadow-inner relative overflow-hidden mb-6`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl -translate-y-1/3 translate-x-1/3" />
              <span className="text-5xl mb-2">📦</span>
              <span className="text-center font-sans font-bold text-sm tracking-wide opacity-90 truncate max-w-full">
                {productName}
              </span>
              <span className="text-[10px] uppercase tracking-widest bg-black/20 text-white/90 px-2.5 py-0.5 rounded-full mt-2 font-mono">
                {country?.nameFr}
              </span>
            </div>

            {/* Seller and Rating Profile */}
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-800 text-sm">PROFIL EXPORTATEUR</h3>
              <div className="flex items-center gap-2">
                <span className="text-2xl filter drop-shadow">{country?.flag}</span>
                <div>
                  <div className="text-sm font-bold text-slate-900">{product.supplierName}</div>
                  <div className="text-xs text-slate-500">{country?.nameFr} — Membre ZLECAf</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 mt-2 text-xs">
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "fill-amber-500" : "text-slate-300"}`} 
                    />
                  ))}
                </div>
                <span className="font-bold text-slate-700">{product.rating}</span>
                <span className="text-slate-400">(42 transactions)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 hidden md:block">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono text-center">
              ID PRODUIT: {product.id}
            </p>
          </div>
        </div>

        {/* Right Side: Price Comparator & RFQ Contact Form */}
        <div className="md:w-7/12 p-6 md:p-8 overflow-y-auto flex flex-col justify-between max-h-[80vh] md:max-h-[90vh]">
          
          {/* Title & Close */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-sans text-slate-900 tracking-tight">
                {productName}
              </h2>
              <p className="text-sm text-slate-500 mt-1">{productDesc}</p>
            </div>
            
            <button 
              onClick={onClose}
              className="hidden md:block p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-500 focus:outline-none"
              aria-label="Close"
              id="close-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Pricing Details & Comparative Tariff Box */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60 mb-6">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              {t('comparateur_prix')}
            </div>

            {/* Dual visual pricing bars representing the AfCFTA vs Non-AfCFTA costs */}
            <div className="space-y-3.5">
              
              {/* Preferential Price (ZLECAf compliant) */}
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    {t('preferential_price')}
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-900 mt-0.5">
                    ${product.preferentialTariffUsd.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ {productUnit}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase bg-emerald-600 text-white px-2.5 py-1 rounded-full shadow-sm">
                    <Award className="w-3.5 h-3.5" />
                    0% Droits de Douane
                  </span>
                  <div className="text-[10px] text-emerald-700 font-mono mt-1 font-semibold">{t('conforme')}</div>
                </div>
              </div>

              {/* Standard Price (Outside Africa imports) */}
              <div className="p-3 bg-red-50/50 border border-red-100 rounded-lg flex items-center justify-between opacity-80">
                <div>
                  <div className="text-xs font-bold text-red-800 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    {t('standard_price')}
                  </div>
                  <div className="text-lg font-bold text-slate-700 mt-0.5">
                    ${product.standardTariffUsd.toLocaleString()} <span className="text-xs font-normal text-slate-400">/ {productUnit}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase bg-red-100 text-red-800 px-2 py-0.5 rounded">
                    +{savingsPct}% de taxes
                  </span>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">Tarif NPF Standard</div>
                </div>
              </div>

            </div>

            {/* Savings projection */}
            <div className="mt-3.5 pt-3.5 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white -mx-4 -mb-4 p-4 rounded-b-xl">
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-semibold">
                  {t('savings')} par unité commandée
                </div>
                <div className="text-lg font-extrabold text-emerald-600 mt-0.5">
                  -${unitSavings.toLocaleString()} USD ({savingsPct}%)
                </div>
              </div>
              <div className="text-xs text-slate-600 max-w-xs text-right sm:text-left">
                Ce produit est accompagné d'un <strong className="text-slate-800">Certificat d'Origine de la ZLECAf</strong> garantissant l'abattement douanier immédiat.
              </div>
            </div>
          </div>

          {/* Logistics highlights */}
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div className="flex items-center gap-2.5 p-3 bg-slate-50 rounded-lg border border-slate-100">
              <Truck className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-mono">{t('lead_time')}</div>
                <div className="font-bold text-slate-800">{product.leadTimeDays} jours</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 bg-slate-50 rounded-lg border border-slate-100">
              <ShoppingBag className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-mono">{t('moq')}</div>
                <div className="font-bold text-slate-800">{product.minOrderQuantity} {productUnit}s</div>
              </div>
            </div>
          </div>

          {/* Formular to Contact the Supplier (RFQ) */}
          <div className="border-t border-slate-100 pt-5">
            <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-amber-500" />
              Demande de Devis Professionnel (RFQ)
            </h3>

            {rfqSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 text-center flex flex-col items-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-2" />
                <h4 className="font-bold text-emerald-900 text-sm">Demande transmise avec succès !</h4>
                <p className="text-xs text-emerald-700 max-w-md mt-1">
                  Votre demande de devis pour <span className="font-bold">{rfqQty} {productUnit}s</span> a été envoyée de manière sécurisée à <span className="font-bold">{product.supplierName}</span> via la messagerie AfriMarket. Un commercial vous contactera sous 24h.
                </p>
                <div className="mt-3 text-xs bg-white text-emerald-800 px-3 py-1.5 rounded-lg font-mono border border-emerald-100">
                  ÉCONOMIE ESTIMÉE DE DROITS DE DOUANE : ${totalSavings.toLocaleString()} USD
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendRfq} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-grow">
                    <label className="block text-xs text-slate-500 mb-1 font-medium">Quantité requise ({productUnit})</label>
                    <input 
                      type="number"
                      min={product.minOrderQuantity}
                      value={rfqQty}
                      onChange={(e) => setRfqQty(Math.max(product.minOrderQuantity, parseInt(e.target.value) || 0))}
                      className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                      required
                    />
                  </div>
                  <div className="sm:w-2/3">
                    <label className="block text-xs text-slate-500 mb-1 font-medium">Délai souhaité</label>
                    <input 
                      type="text"
                      defaultValue={`${product.leadTimeDays} jours (Standard)`}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                      disabled
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-500 mb-1 font-medium">Spécifications ou questions complémentaires</label>
                  <textarea 
                    rows={2}
                    placeholder="Ex: Bonjour, nous aimerions obtenir un devis incluant la livraison FOB. Nos entrepôts sont situés à..."
                    value={rfqMessage}
                    onChange={(e) => setRfqMessage(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    required
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-500">
                    Calculateur de douane : <strong className="text-emerald-600 font-bold">-${unitSavings * rfqQty} USD</strong> d'économie !
                  </span>
                  
                  <button
                    type="submit"
                    style={{ backgroundColor: "var(--color-primary)" }}
                    className="inline-flex items-center gap-2 text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:opacity-90 shadow active:scale-95 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Envoyer ma demande
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
