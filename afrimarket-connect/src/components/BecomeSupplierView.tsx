import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { useTranslation } from "react-i18next";
import { COUNTRIES } from "../data/countries";
import { Award, ShieldCheck, CheckCircle2, Building, Scale, ArrowRight, HelpCircle } from "lucide-react";

export const BecomeSupplierView: React.FC = () => {
  const { selectedCountry, registerSupplier, selectedLanguage } = useApp();
  const { t } = useTranslation();

  const [companyName, setCompanyName] = useState("");
  const [sector, setSector] = useState("Agriculture");
  const [regNumber, setRegNumber] = useState("");
  const [countryId, setCountryId] = useState(selectedCountry?.id || "senegal");
  const [hasCertOfOrigin, setHasCertOfOrigin] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!selectedCountry) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerSupplier({
      name: companyName,
      sector,
      regNumber,
      countryId,
      hasCertOfOrigin
    });
    setIsSuccess(true);
  };

  const handleResetForm = () => {
    setCompanyName("");
    setSector("Agriculture");
    setRegNumber("");
    setHasCertOfOrigin(false);
    setIsSuccess(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans pb-16">
      
      {/* Overview & Educational Guidance */}
      <section 
        style={{ borderTopColor: "var(--color-primary)" }}
        className="bg-white text-slate-800 rounded-2xl p-6 md:p-8 shadow-md border-t-4 border-x border-b border-slate-200/80 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full font-mono">
              Label Origine Certifiée
            </span>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900">
              {t('supplier_form_title')}
            </h1>
            <p className="text-xs md:text-sm text-slate-500 max-w-2xl leading-relaxed font-medium">
              {t('supplier_form_desc')}
            </p>
          </div>
          
          <div className="flex-shrink-0 p-4 bg-slate-50 border border-slate-200 rounded-xl text-center flex flex-col items-center shadow-sm">
            <ShieldCheck className="w-8 h-8 text-emerald-500 mb-1" />
            <span className="text-lg font-black text-slate-800">90%</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-wider font-extrabold">de taxes en moins</span>
          </div>
        </div>
      </section>

      {/* Success State */}
      {isSuccess ? (
        <div className="bg-white rounded-2xl border border-emerald-100 shadow-xl p-8 text-center flex flex-col items-center space-y-4 animate-fade-in">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full">
            <CheckCircle2 className="w-16 h-16 animate-bounce" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">Félicitations ! Votre entreprise est enregistrée !</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              La demande d'habilitation commerciale pour <strong className="text-slate-800">{companyName}</strong> a été enregistrée auprès du secrétariat général de la ZLECAf.
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-xs max-w-lg space-y-2 text-left">
            <div className="font-bold text-emerald-900 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Ce qui se passe maintenant :
            </div>
            <p className="text-emerald-700 leading-relaxed">
              1. **Indexation instantanée** : Votre profil est visible dans l'onglet <strong className="text-emerald-900">Fournisseurs</strong> d'AfriMarket.
              <br />
              2. **Catalogue fictif généré** : Un produit témoin a été ajouté à notre page d'accueil pour vous permettre de simuler des échanges B2B.
              <br />
              3. **Vérification d'Origine** : Les autorités douanières nationales procéderont à un audit sous 48 heures pour certifier la transformation locale.
            </p>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              onClick={handleResetForm}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-600 transition-colors"
            >
              Enregistrer une autre entreprise
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{ backgroundColor: "var(--color-primary)" }}
              className="px-5 py-2 text-white rounded-lg text-xs font-semibold hover:opacity-90 shadow transition-all"
            >
              Retourner à l'accueil
            </button>
          </div>
        </div>
      ) : (
        /* Form Card */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Main Form Box */}
          <div className="md:col-span-2 bg-white rounded-2xl p-6 md:p-8 shadow border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
                Formulaire d'Éligibilité B2B
              </h2>

              {/* Company Name */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {t('supplier_name')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Sousse Huiles, Dakar Textile Mills..."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/60 border border-slate-200 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                  id="become-supplier-name-input"
                />
              </div>

              {/* Grid 2 Cols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Sector Select */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    {t('supplier_cat')}
                  </label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-[var(--color-primary)] font-medium"
                  >
                    <option value="Agriculture">🌾 Agriculture & Agroalimentaire</option>
                    <option value="Textile">🧵 Textile & Mode</option>
                    <option value="Manufacture">🧱 Matériaux de Construction</option>
                    <option value="Chimie">🧪 Produits Chimiques & Cosmétiques</option>
                    <option value="Technologie">⚡ Électronique & Technologie</option>
                  </select>
                </div>

                {/* Country Origin (Editable but prefilled) */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Pays de Production
                  </label>
                  <select
                    value={countryId}
                    onChange={(e) => setCountryId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-[var(--color-primary)] font-medium"
                  >
                    {COUNTRIES.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.flag} {c.nameFr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* National Registration Code */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {t('supplier_reg')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: SN-DKR-2026-B-98124, RC/NIG/342981..."
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/60 border border-slate-200 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                  id="become-supplier-reg-input"
                />
              </div>

              {/* Rule of Origin Checkbox Toggle Card */}
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-500/5 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="hasCertOfOrigin"
                  checked={hasCertOfOrigin}
                  onChange={(e) => setHasCertOfOrigin(e.target.checked)}
                  className="mt-1 w-4 h-4 text-amber-500 border-amber-300 rounded focus:ring-amber-500"
                />
                <div className="space-y-1">
                  <label htmlFor="hasCertOfOrigin" className="text-xs font-bold text-slate-900 cursor-pointer block select-none">
                    {t('supplier_origin_cert')}
                  </label>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Je confirme que nos marchandises respectent les critères d'Origine de la ZLECAf avec un taux de transformation locale supérieure à 35% de valeur ajoutée nationale.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{ backgroundColor: "var(--color-primary)" }}
                className="w-full text-white text-xs font-bold py-3 px-4 rounded-lg hover:opacity-95 shadow active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                id="become-supplier-submit-btn"
              >
                <span>{t('supplier_submit')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Guidelines Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-5 shadow border border-slate-100 space-y-3">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-mono flex items-center gap-1">
                <Building className="w-4 h-4 text-amber-500" />
                Vérification locale
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Le secrétariat national de la ZLECAf de votre pays procédera à une visite technique gratuite de vos ateliers de production afin de valider le dossier d'origine commerciale.
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow border border-slate-100 space-y-3">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-mono flex items-center gap-1">
                <Scale className="w-4 h-4 text-emerald-500" />
                Critères clés
              </h3>
              <ul className="text-xs text-slate-500 space-y-2 list-disc list-inside">
                <li>Matières premières d'Afrique</li>
                <li>Habilitations locales</li>
                <li>Facture d'origine d'exportation</li>
                <li>Main d'œuvre locale majoritaire</li>
              </ul>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
