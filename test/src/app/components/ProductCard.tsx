import { Star, ShieldCheck, ArrowRight, Building2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Product } from "../data/products";
import { COUNTRIES } from "../data/countries";
import { SUPPLIERS } from "../data/suppliers";
import { useLanguage, t } from "../contexts/LanguageContext";
import { formatLocalPrice } from "../utils/pricing";

interface ProductCardProps {
  product: Product;
  countryId: string;
  onOpen?: (product: Product) => void;
}

function formatPrice(priceUsd: number, countryId: string, language: string) {
  return formatLocalPrice(priceUsd, countryId, language);
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Note: ${rating} sur 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

function CountryBadge({ countryId, language }: { countryId: string; language: string }) {
  const c = COUNTRIES.find((x) => x.id === countryId);
  if (!c) return null;
  return (
    <span
      className="inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded text-white"
      style={{ backgroundColor: c.color }}
      title={c.name[language as keyof typeof c.name]}
    >
      {c.code}
    </span>
  );
}

export function ProductCard({ product, countryId, onOpen }: ProductCardProps) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const price = formatPrice(product.priceUsd, countryId, language);
  const supplier = SUPPLIERS.find((s) => s.id === product.supplierId);
  const supplierCountry = COUNTRIES.find((c) => c.id === supplier?.countryId);
  const openProduct = () => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      navigate(`/products/${product.id}`);
      return;
    }

    if (onOpen) {
      onOpen(product);
      return;
    }

    navigate(`/products/${product.id}`);
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={openProduct}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openProduct();
        }
      }}
      className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow duration-200 flex flex-col cursor-pointer"
    >
      <div className="relative h-44 bg-muted overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name[language]}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 left-2">
          <CountryBadge countryId={product.country} language={language} />
        </div>
        {product.taxFree && (
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3 h-3" />
              {t("taxFree", language)}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-bold text-foreground leading-snug line-clamp-2" style={{ fontSize: "0.95rem" }}>
          {product.name[language]}
        </h3>
        
        {/* Supplier info - clickable */}
        {supplier && (
          <Link
            to={`/suppliers/${supplier.id}`}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors group"
            onClick={(e) => e.stopPropagation()}
          >
            <Building2 className="w-3.5 h-3.5 group-hover:text-primary" />
            <div className="flex items-center gap-1.5">
              <span className="font-semibold group-hover:underline">{supplier.name}</span>
              <span>•</span>
              <span className="font-semibold" style={{ color: supplierCountry?.color }}>
                {supplierCountry?.name[language]}
              </span>
              {supplier.verified && (
                <ShieldCheck className="w-3 h-3 text-green-600 inline" title={t("verified", language)} />
              )}
            </div>
          </Link>
        )}
        
        <StarRating rating={product.rating} />
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{product.description[language]}</p>
        
        <div className="mt-auto pt-3 border-t border-border">
          <div className="flex items-end justify-between">
            <div>
              <div className="font-extrabold text-primary text-lg leading-none">{price.local}</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {price.usd} · {t("min", language)} {product.minQty} {product.unit[language]}
              </div>
            </div>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                openProduct();
              }}
              className="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors flex items-center gap-1"
            >
              Voir plus
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
