import React, { useState } from "react";
import { useApp, BarrierReport } from "../context/AppContext";
import { useTranslation } from "react-i18next";
import { COUNTRIES } from "../data/countries";
import { AlertTriangle, MapPin, CheckCircle2, FileText, Send, BellRing, Calendar, ShieldAlert } from "lucide-react";

export const ReportBarrierView: React.FC = () => {
  const { barrierReports, addBarrierReport, selectedLanguage } = useApp();
  const { t } = useTranslation();

  const [type, setType] = useState("Retards aux douanes");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [countryId, setCountryId] = useState("senegal");
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedReportOnMap, setSelectedReportOnMap] = useState<BarrierReport | null>(barrierReports[0] || null);

  const getCountryFlag = (cid: string) => {
    return COUNTRIES.find(c => c.id === cid)?.flag || "🌍";
  };

  const getCountryName = (cid: string) => {
    return COUNTRIES.find(c => c.id === cid)?.nameFr || cid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBarrierReport({
      countryId,
      type,
      description,
      location
    });
    setIsSuccess(true);
    setDescription("");
    setLocation("");
    setTimeout(() => {
      setIsSuccess(false);
    }, 4500);
  };

  return (
    <div className="space-y-8 font-sans pb-16">
      
      {/* Intro section */}
      <div>
        <h1 className="text-2xl font-bold font-sans text-slate-900 tracking-tight flex items-center gap-2">
          <AlertTriangle className="text-amber-500 w-7 h-7" />
          {t('barrier_title')}
        </h1>
        <p className="text-slate-500 text-xs md:text-sm">
          {t('barrier_description')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Simplified Trade Map & Current Reports list */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Custom Stylized African Border Grid Map */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
            <h2 className="text-sm font-bold tracking-wider text-slate-400 font-mono uppercase mb-4 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-500 animate-bounce" />
              {t('barrier_map')} — Points Douaniers Connectés
            </h2>

            {/* Simulated African Map Layout using stylized border circles */}
            <div className="h-64 relative bg-slate-950/60 rounded-xl border border-slate-800/80 p-4 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Central Map graphics (abstract nodes and trading routes connecting countries) */}
              <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
                <path d="M 120 180 L 220 80 M 220 80 L 380 90 M 380 90 L 450 180 M 380 90 L 320 220 M 120 180 L 320 220" stroke="white" strokeWidth="1.5" strokeDasharray="5 5" />
                <path d="M 220 80 L 450 180 M 120 180 L 450 180" stroke="var(--color-primary)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>

              {/* Blinking hotspots representing reported custom checkpoints */}
              {barrierReports.map((report, idx) => {
                // Determine a unique visual position for each landmark report
                const positions = [
                  { top: "35%", left: "15%" }, // Rosso
                  { top: "68%", left: "32%" }, // Noe
                  { top: "52%", left: "78%" }, // Busia
                  { top: "20%", left: "55%" }, // Tanger
                  { top: "58%", left: "50%" }  // Seme
                ];
                const pos = positions[idx % positions.length];
                const isSelected = selectedReportOnMap?.id === report.id;

                return (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReportOnMap(report)}
                    style={{ top: pos.top, left: pos.left }}
                    className="absolute p-2 -translate-x-1/2 -translate-y-1/2 group z-10 focus:outline-none"
                    title={report.location}
                  >
                    <span className="relative flex h-5 w-5">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        report.status === "Résolu" ? "bg-emerald-400" : "bg-rose-400"
                      }`} />
                      <span className={`relative inline-flex rounded-full h-5 w-5 border-2 border-white items-center justify-center text-[10px] font-bold shadow ${
                        isSelected 
                          ? "bg-amber-500 text-slate-950 scale-125 z-20" 
                          : (report.status === "Résolu" ? "bg-emerald-500 text-white" : "bg-rose-500 text-white")
                      }`}>
                        {idx + 1}
                      </span>
                    </span>
                    {/* Small hover text */}
                    <span className="hidden group-hover:block absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-slate-800 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded border border-slate-700 whitespace-nowrap z-30">
                      {report.location.split(" ")[0]}
                    </span>
                  </button>
                );
              })}

              <div className="absolute bottom-3 left-3 flex gap-4 text-[10px] font-bold text-slate-400 font-mono">
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Alerte NTB active
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Résolu
                </div>
              </div>
            </div>

            {/* Highlighted Selected Report card from map */}
            {selectedReportOnMap && (
              <div className="mt-5 p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2.5 animate-fade-in text-xs">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-amber-500 flex items-center gap-1">
                    <span className="text-sm">{getCountryFlag(selectedReportOnMap.countryId)}</span>
                    {selectedReportOnMap.location}
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                    selectedReportOnMap.status === "Résolu" 
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" 
                      : (selectedReportOnMap.status === "En cours d'examen" ? "bg-amber-500/10 text-amber-400 border border-amber-500/30" : "bg-slate-800 text-slate-400")
                  }`}>
                    {selectedReportOnMap.status}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed italic">"{selectedReportOnMap.description}"</p>
                <div className="text-[10px] text-slate-500 flex items-center gap-4 font-mono">
                  <span>CATÉGORIE: {selectedReportOnMap.type}</span>
                  <span>SIGNALÉ LE: {selectedReportOnMap.date}</span>
                </div>
              </div>
            )}
          </div>

          {/* List of Recent reports */}
          <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-mono flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <BellRing className="w-4 h-4 text-amber-500" />
              Derniers incidents rapportés anonymement
            </h3>
            
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1.5 custom-scrollbar">
              {barrierReports.map((report) => (
                <div 
                  key={report.id}
                  onClick={() => setSelectedReportOnMap(report)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex justify-between items-start gap-4 text-xs ${
                    selectedReportOnMap?.id === report.id 
                      ? "border-amber-300 bg-amber-50/40 shadow-sm" 
                      : "border-slate-100 bg-slate-50 hover:bg-slate-100/50"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1">
                      <span>{getCountryFlag(report.countryId)}</span>
                      <span>{report.location}</span>
                    </div>
                    <p className="text-slate-500 line-clamp-1">{report.description}</p>
                    <div className="text-[10px] text-slate-400 flex items-center gap-3 font-mono">
                      <span className="flex items-center gap-0.5"><Calendar className="w-3 h-3" /> {report.date}</span>
                      <span>Catégorie : {report.type}</span>
                    </div>
                  </div>

                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                    report.status === "Résolu" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {report.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Report form sidebar */}
        <div className="bg-white rounded-2xl p-6 shadow border border-slate-100 space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
            Signaler un blocage
          </h2>

          {isSuccess ? (
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 text-center flex flex-col items-center space-y-2 animate-fade-in">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              <h3 className="font-bold text-emerald-900 text-sm">Signalement enregistré !</h3>
              <p className="text-xs text-emerald-700 leading-relaxed">
                Votre signalement anonyme a été transmis au comité de surveillance des barrières non-tarifaires de la ZLECAf. Il apparaîtra instantanément sur la carte nationale de veille.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Type dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {t('barrier_form_type')}
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-rose-500 font-medium text-xs"
                >
                  <option value="Retards aux douanes">⏱️ Retards douaniers arbitraires</option>
                  <option value="Taxes illégales">💰 Taxes douanières non-officielles</option>
                  <option value="Harcèlement">👮 Harcèlement douanier / Contrôles abusifs</option>
                  <option value="Exigences documentaires">📄 Exigences de paperasse redondante</option>
                  <option value="Normes sanitaires discriminatoires">🍎 Normes sanitaires excessives</option>
                  <option value="Autres entraves physiques">🚧 Barrières physiques de transit</option>
                </select>
              </div>

              {/* Location Input */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {t('barrier_form_loc')}
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Port d'Abidjan, Douane Rosso, Frontière Seme..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/60 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>

              {/* Country select */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Pays de l'Incident
                </label>
                <select
                  value={countryId}
                  onChange={(e) => setCountryId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-rose-500 font-medium text-xs"
                >
                  {COUNTRIES.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.flag} {c.nameFr}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description Textarea */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {t('barrier_form_desc')}
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Expliquez brièvement l'entrave rencontrée (ex: les douaniers refusent d'accepter le certificat d'origine de l'UA et exigent un pot-de-vin)..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/60 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>

              {/* Submit btn */}
              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-4 rounded-lg shadow active:scale-95 transition-all flex items-center justify-center gap-2"
                id="submit-barrier-btn"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t('barrier_submit')}</span>
              </button>
            </form>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2 text-slate-600 text-[11px] leading-relaxed">
            <h4 className="font-bold text-amber-900 flex items-center gap-1">
              🔒 Anonymat Garanti
            </h4>
            <p>
              Les rapports d'incident n'exposent jamais vos informations personnelles ou d'entreprise. Ils sont directement agrégés pour générer la cartographie NTB transmise mensuellement au Secrétariat Général de la ZLECAf basé à Accra.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
