import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Menu, X, LogIn, UserPlus, MapPin, ChevronDown,
  Home, Package, Users, ArrowRight,
} from "lucide-react";
import { LanguageSelector } from "../components/LanguageSelector";
import { useLanguage, t } from "../contexts/LanguageContext";
import { COUNTRIES } from "../data/countries";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [countryId, setCountryId] = useState(() => {
    return localStorage.getItem("afrimarket-country") || "sn";
  });

  // Auto-change language when country changes
  useEffect(() => {
    const country = COUNTRIES.find((c) => c.id === countryId);
    if (country && country.defaultLanguage !== language) {
      setLanguage(country.defaultLanguage);
    }
    localStorage.setItem("afrimarket-country", countryId);
  }, [countryId]);

  const navLinks = [
    { label: t("home", language), path: "/" },
    { label: t("products", language), path: "/products" },
    { label: t("suppliers", language), path: "/suppliers" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            aria-label="AfriMarket Connect — Accueil"
          >
            <img
              src="/assets/logo-afrimarket.png"
              alt="AfriMarket Connect"
              className="h-10 sm:h-11 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className={`text-sm font-semibold transition-colors ${
                  location.pathname === path
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side: Language + Country + Auth */}
          <div className="flex items-center gap-2">
            {/* Language selector */}
            <div className="hidden sm:block">
              <LanguageSelector />
            </div>

            {/* Country dropdown */}
            <div className="relative hidden sm:block">
              <div className="flex items-center gap-1 bg-muted rounded-lg px-2 py-1.5 cursor-pointer">
                <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                <select
                  value={countryId}
                  onChange={(e) => setCountryId(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-foreground border-none outline-none cursor-pointer pr-4"
                  aria-label={t("filterByCountry", language)}
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name[language]}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-muted-foreground absolute right-2 pointer-events-none" />
              </div>
            </div>

            <button
              onClick={() => navigate("/login")}
              className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              <LogIn className="w-4 h-4" />
              {t("login", language)}
            </button>

            <button
              onClick={() => navigate("/register")}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#163d2e] transition-colors hidden md:flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              {t("register", language)}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-3">
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-left text-base font-semibold py-2 ${
                  location.pathname === path ? "text-primary" : "text-foreground"
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="border-t border-border pt-3 flex flex-col gap-2">
              <LanguageSelector />
              <select
                value={countryId}
                onChange={(e) => setCountryId(e.target.value)}
                className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm font-medium border-none outline-none"
                aria-label={t("filterByCountry", language)}
              >
                {COUNTRIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name[language]} — {c.currencySymbol}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  navigate("/login");
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 border border-border rounded-xl text-sm font-bold text-foreground hover:bg-muted transition-colors"
              >
                {t("login", language)}
              </button>
              <button
                onClick={() => {
                  navigate("/register");
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-[#163d2e] transition-colors"
              >
                {t("register", language)}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      <section className="bg-primary px-4 py-10 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h2 className="text-2xl md:text-3xl font-black" style={{ fontFamily: "Outfit, sans-serif" }}>
              Rejoignez le grand marche africain
            </h2>
            <p className="mt-2 text-white/90 font-semibold">
              C'est gratuit et sans taxe entre pays africains.
            </p>
          </div>
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary rounded-xl px-6 py-3 font-black hover:bg-white/90 transition-colors"
          >
            Creer mon compte gratuitement
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <footer className="bg-foreground text-white px-4 py-10 pb-24 md:pb-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-8">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 bg-white rounded-xl px-3 py-2" aria-label="AfriMarket Connect">
              <img
                src="/assets/logo-afrimarket.png"
                alt="AfriMarket Connect"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
              Un marche africain plus simple pour trouver, vendre et acheter entre pays africains.
            </p>
          </div>

          <div>
            <h3 className="font-black mb-3">Liens utiles</h3>
            <div className="flex flex-col gap-2 text-sm text-white/75">
              <Link to="/products" className="hover:text-white transition-colors">Produits</Link>
              <Link to="/suppliers" className="hover:text-white transition-colors">Fournisseurs</Link>
              <Link to="/register" className="hover:text-white transition-colors">Inscription</Link>
            </div>
          </div>

          <div>
            <h3 className="font-black mb-3">Mentions legales</h3>
            <div className="flex flex-col gap-2 text-sm text-white/75">
              <a href="#" className="hover:text-white transition-colors">Conditions d'utilisation</a>
              <a href="#" className="hover:text-white transition-colors">Confidentialite</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom nav (mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border flex">
        <Link
          to="/"
          className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 text-[10px] font-semibold transition-colors ${
            location.pathname === "/" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Home className="w-5 h-5" />
          {t("home", language)}
        </Link>
        <Link
          to="/products"
          className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 text-[10px] font-semibold transition-colors ${
            location.pathname === "/products" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Package className="w-5 h-5" />
          {t("products", language)}
        </Link>
        <Link
          to="/suppliers"
          className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 text-[10px] font-semibold transition-colors ${
            location.pathname === "/suppliers" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Users className="w-5 h-5" />
          {t("suppliers", language)}
        </Link>
      </nav>
    </div>
  );
}
