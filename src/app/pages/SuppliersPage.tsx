import { useState } from "react";
import { Search, Globe2 } from "lucide-react";
import { SUPPLIERS } from "../data/suppliers";
import { COUNTRIES } from "../data/countries";
import { SupplierCard } from "../components/SupplierCard";
import { useLanguage, t } from "../contexts/LanguageContext";

export function SuppliersPage() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");

  // Filter suppliers
  const filtered = SUPPLIERS.filter((supplier) => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.description[language].toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCountry = selectedCountry === "all" || supplier.countryId === selectedCountry;
    
    return matchesSearch && matchesCountry;
  });

  // Get unique countries from suppliers
  const supplierCountries = Array.from(new Set(SUPPLIERS.map(s => s.countryId)))
    .map(id => COUNTRIES.find(c => c.id === id))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
            {t("suppliers", language)}
          </h1>
          <p className="text-muted-foreground text-lg">
            {language === "fr" && "Découvrez nos fournisseurs africains vérifiés"}
            {language === "en" && "Discover our verified African suppliers"}
            {language === "es" && "Descubra nuestros proveedores africanos verificados"}
            {language === "ar" && "اكتشف مورّدينا الأفارقة الموثوقين"}
            {language === "pt" && "Descubra nossos fornecedores africanos verificados"}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("searchSuppliers", language)}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Country filter */}
          <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
            <Globe2 className="w-4 h-4 text-muted-foreground" />
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-transparent text-sm font-semibold outline-none cursor-pointer pr-4"
            >
              <option value="all">{t("all", language)}</option>
              {supplierCountries.map((country) => (
                <option key={country!.id} value={country!.id}>
                  {country!.name[language]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-4">
          {filtered.length} {language === "fr" && "fournisseur(s) trouvé(s)"}
          {language === "en" && "supplier(s) found"}
          {language === "es" && "proveedor(es) encontrado(s)"}
          {language === "ar" && "مورد (موردون) تم العثور عليه"}
          {language === "pt" && "fornecedor(es) encontrado(s)"}
        </p>

        {/* Suppliers grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              {language === "fr" && "Aucun fournisseur trouvé"}
              {language === "en" && "No suppliers found"}
              {language === "es" && "No se encontraron proveedores"}
              {language === "ar" && "لم يتم العثور على موردين"}
              {language === "pt" && "Nenhum fornecedor encontrado"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((supplier) => (
              <SupplierCard key={supplier.id} supplier={supplier} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
