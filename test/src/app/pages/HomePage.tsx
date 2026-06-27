import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import {
  ShieldCheck, ChevronLeft, ChevronRight, Search, Package,
  Globe2, UserPlus, HandCoins,
  TrendingUp, Award,
} from "lucide-react";
import { PRODUCTS, type Product } from "../data/products";
import { CATEGORIES } from "../data/categories";
import { HERO_SLIDES } from "../data/hero-slides";
import { ProductCard } from "../components/ProductCard";
import { ProductOrderDialog } from "../components/ProductOrderDialog";
import { useLanguage, t } from "../contexts/LanguageContext";

export function HomePage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [countryId] = useState(() => {
    return localStorage.getItem("afrimarket-country") || "sn";
  });

  const next = useCallback(() => setCurrentSlide((c) => (c + 1) % HERO_SLIDES.length), []);
  const prev = useCallback(() => setCurrentSlide((c) => (c - 1 + HERO_SLIDES.length) % HERO_SLIDES.length), []);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  const filteredProducts = selectedCategory === "all"
    ? PRODUCTS.slice(0, 8)
    : PRODUCTS.filter((p) => p.category === selectedCategory).slice(0, 8);

  return (
    <div className="bg-background pb-20 md:pb-8">
      {/* Hero Carousel */}
      <section className="relative h-[520px] md:h-[620px] overflow-hidden bg-gray-900">
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === currentSlide ? 1 : 0 }}
          >
            <img src={slide.url} alt={slide.alt} className="w-full h-full object-cover" />
          </div>
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/90 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-5">
            <ShieldCheck className="w-3.5 h-3.5" />
            {language === "fr" && "54 pays africains · Zéro taxe entre eux · ZLECAf"}
            {language === "en" && "54 African countries · Zero tax between them · AfCFTA"}
            {language === "es" && "54 países africanos · Cero impuestos entre ellos · ZLECAf"}
            {language === "ar" && "54 دولة أفريقية · صفر ضرائب بينها · منطقة التجارة الحرة"}
            {language === "pt" && "54 países africanos · Zero impostos entre eles · ZLECAf"}
          </div>

          <h1
            className="text-white font-black leading-tight text-4xl md:text-6xl max-w-3xl"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {t("heroTitle", language).split(" ").slice(0, -2).join(" ")}{" "}
            <span className="text-accent">{t("heroTitle", language).split(" ").slice(-2).join(" ")}</span>
          </h1>

          <p className="text-white/90 text-base md:text-xl mt-4 max-w-xl leading-relaxed">
            {t("heroSubtitle", language)}
          </p>

          {/* Search bar */}
          <div className="mt-8 w-full max-w-xl">
            <div className="flex bg-white rounded-xl overflow-hidden shadow-2xl">
              <div className="flex-1 flex items-center gap-2 px-4">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  type="search"
                  placeholder={t("search", language)}
                  className="flex-1 py-4 text-sm text-foreground placeholder:text-muted-foreground bg-transparent border-none outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") navigate("/products");
                  }}
                />
              </div>
              <button
                onClick={() => navigate("/products")}
                className="bg-primary text-white px-6 font-bold text-sm hover:bg-green-700 transition-colors m-1.5 rounded-lg"
              >
                {t("search", language).split("...")[0]}
              </button>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="mt-6 flex gap-3 flex-wrap justify-center">
            <button
              onClick={() => navigate("/register")}
              className="bg-primary text-white px-7 py-3.5 rounded-xl font-bold text-base hover:bg-green-700 transition-colors flex items-center gap-2 shadow-lg"
            >
              <Package className="w-5 h-5" />
              {language === "fr" && "Je veux vendre"}
              {language === "en" && "I want to sell"}
              {language === "es" && "Quiero vender"}
              {language === "ar" && "أريد أن أبيع"}
              {language === "pt" && "Quero vender"}
            </button>
            <button
              onClick={() => navigate("/products")}
              className="bg-accent text-white px-7 py-3.5 rounded-xl font-bold text-base hover:bg-amber-600 transition-colors flex items-center gap-2 shadow-lg"
            >
              <Search className="w-5 h-5" />
              {language === "fr" && "Je veux acheter"}
              {language === "en" && "I want to buy"}
              {language === "es" && "Quiero comprar"}
              {language === "ar" && "أريد أن أشتري"}
              {language === "pt" && "Quero comprar"}
            </button>
          </div>
        </div>

        {/* Carousel controls */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur text-white p-2 rounded-full transition-colors"
          aria-label="Image précédente"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur text-white p-2 rounded-full transition-colors"
          aria-label="Image suivante"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-20">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`rounded-full transition-all ${
                i === currentSlide ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-white/60"
              }`}
              aria-label={`Diapositive ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Banner */}
      <div className="bg-primary py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
          <Globe2 className="w-5 h-5 shrink-0 text-white" />
          <p className="font-bold text-sm md:text-base text-center text-white">
            {language === "fr" && "54 pays africains. 1 seul marché. 0 taxe entre eux."}
            {language === "en" && "54 African countries. 1 single market. 0 tax between them."}
            {language === "es" && "54 países africanos. 1 solo mercado. 0 impuestos entre ellos."}
            {language === "ar" && "54 دولة أفريقية. سوق واحد. 0 ضرائب بينهم."}
            {language === "pt" && "54 países africanos. 1 único mercado. 0 impostos entre eles."}
          </p>
        </div>
      </div>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-12" style={{ fontFamily: "Outfit, sans-serif" }}>
          {language === "fr" && "Comment ça marche ?"}
          {language === "en" && "How does it work?"}
          {language === "es" && "¿Cómo funciona?"}
          {language === "ar" && "كيف يعمل؟"}
          {language === "pt" && "Como funciona?"}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              Icon: UserPlus,
              title: { fr: "Je m'inscris", en: "I register", es: "Me registro", ar: "أسجل", pt: "Eu me registro" },
              desc: { fr: "Créez votre compte en 2 minutes. C'est gratuit.", en: "Create your account in 2 minutes. It's free.", es: "Cree su cuenta en 2 minutos. Es gratis.", ar: "أنشئ حسابك في دقيقتين. إنه مجاني.", pt: "Crie sua conta em 2 minutos. É grátis." },
            },
            {
              Icon: Search,
              title: { fr: "Je trouve", en: "I find", es: "Encuentro", ar: "أجد", pt: "Eu encontro" },
              desc: { fr: "Cherchez un produit ou un acheteur dans toute l'Afrique.", en: "Search for a product or buyer across Africa.", es: "Busque un producto o comprador en toda África.", ar: "ابحث عن منتج أو مشتري في جميع أنحاء أفريقيا.", pt: "Procure um produto ou comprador em toda a África." },
            },
            {
              Icon: HandCoins,
              title: { fr: "Je vends sans taxe", en: "I sell tax-free", es: "Vendo sin impuestos", ar: "أبيع بدون ضرائب", pt: "Vendo sem impostos" },
              desc: { fr: "L'accord ZLECAf supprime les taxes entre pays africains.", en: "The AfCFTA agreement removes taxes between African countries.", es: "El acuerdo ZLECAf elimina los impuestos entre países africanos.", ar: "اتفاقية منطقة التجارة الحرة تزيل الضرائب بين البلدان الأفريقية.", pt: "O acordo ZLECAf remove impostos entre países africanos." },
            },
          ].map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <step.Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-2">{step.title[language as keyof typeof step.title]}</h3>
              <p className="text-muted-foreground">{step.desc[language as keyof typeof step.desc]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-black" style={{ fontFamily: "Outfit, sans-serif" }}>
            {language === "fr" && "Produits populaires"}
            {language === "en" && "Popular Products"}
            {language === "es" && "Productos Populares"}
            {language === "ar" && "المنتجات الشعبية"}
            {language === "pt" && "Produtos Populares"}
          </h2>
          <button
            onClick={() => navigate("/products")}
            className="text-sm font-semibold text-primary hover:underline"
          >
            {language === "fr" && "Voir tout"}
            {language === "en" && "View all"}
            {language === "es" && "Ver todo"}
            {language === "ar" && "عرض الكل"}
            {language === "pt" && "Ver tudo"}
          </button>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <cat.Icon className="w-4 h-4" />
              {t(cat.id, language)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              countryId={countryId}
              onOpen={setActiveProduct}
            />
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-br from-green-50 to-amber-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { Icon: TrendingUp, value: "2,400+", label: { fr: "Fournisseurs actifs", en: "Active Suppliers", es: "Proveedores Activos", ar: "الموردون النشطون", pt: "Fornecedores Ativos" } },
              { Icon: Package, value: "12,800+", label: { fr: "Produits disponibles", en: "Available Products", es: "Productos Disponibles", ar: "المنتجات المتاحة", pt: "Produtos Disponíveis" } },
              { Icon: Award, value: "54", label: { fr: "Pays africains", en: "African Countries", es: "Países Africanos", ar: "البلدان الأفريقية", pt: "Países Africanos" } },
            ].map((stat, i) => (
              <div key={i}>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-4xl font-black text-primary mb-1">{stat.value}</div>
                <div className="text-muted-foreground font-semibold">{stat.label[language as keyof typeof stat.label]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
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
