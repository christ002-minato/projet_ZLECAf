import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { PRODUCTS, type Product } from "../data/products";
import { COUNTRIES } from "../data/countries";
import { CATEGORIES } from "../data/categories";
import { ProductCard } from "../components/ProductCard";
import { ProductOrderDialog } from "../components/ProductOrderDialog";
import { useLanguage, t } from "../contexts/LanguageContext";

export function ProductsPage() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [countryId] = useState(() => {
    return localStorage.getItem("afrimarket-country") || "sn";
  });

  // Filter products
  const filtered = PRODUCTS.filter((product) => {
    const matchesSearch =
      product.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description[language].toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesCountry = selectedCountry === "all" || product.country === selectedCountry;

    return matchesSearch && matchesCategory && matchesCountry;
  });

  // Get unique countries from products
  const productCountries = Array.from(new Set(PRODUCTS.map((p) => p.country)))
    .map((id) => COUNTRIES.find((c) => c.id === id))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
            {t("products", language)}
          </h1>
          <p className="text-muted-foreground text-lg">
            {language === "fr" && "Découvrez des milliers de produits africains sans taxes"}
            {language === "en" && "Discover thousands of tax-free African products"}
            {language === "es" && "Descubra miles de productos africanos sin impuestos"}
            {language === "ar" && "اكتشف آلاف المنتجات الأفريقية بدون ضرائب"}
            {language === "pt" && "Descubra milhares de produtos africanos sem impostos"}
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-card border border-border rounded-xl p-4 mb-6">
          {/* Search bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("search", language)}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Category pills */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold text-xs whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <cat.Icon className="w-3.5 h-3.5" />
                {t(cat.id, language)}
              </button>
            ))}
          </div>

          {/* Country filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground">{t("filterByCountry", language)}:</span>
            <div className="flex gap-2 overflow-x-auto">
              <button
                onClick={() => setSelectedCountry("all")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${
                  selectedCountry === "all"
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {t("all", language)}
              </button>
              {productCountries.map((country) => (
                <button
                  key={country!.id}
                  onClick={() => setSelectedCountry(country!.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${
                    selectedCountry === country!.id
                      ? "text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                  style={
                    selectedCountry === country!.id
                      ? { backgroundColor: country!.color }
                      : undefined
                  }
                >
                  {country!.name[language]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-4">
          {filtered.length}{" "}
          {language === "fr" && "produit(s) trouvé(s)"}
          {language === "en" && "product(s) found"}
          {language === "es" && "producto(s) encontrado(s)"}
          {language === "ar" && "منتج (منتجات) تم العثور عليه"}
          {language === "pt" && "produto(s) encontrado(s)"}
        </p>

        {/* Products grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              {language === "fr" && "Aucun produit trouvé"}
              {language === "en" && "No products found"}
              {language === "es" && "No se encontraron productos"}
              {language === "ar" && "لم يتم العثور على منتجات"}
              {language === "pt" && "Nenhum produto encontrado"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                countryId={countryId}
                onOpen={setActiveProduct}
              />
            ))}
          </div>
        )}
      </div>
      <ProductOrderDialog
        product={activeProduct}
        countryId={countryId}
        open={Boolean(activeProduct)}
        onOpenChange={(open) => {
          if (!open) setActiveProduct(null);
        }}
      />
    </div>
  );
}
