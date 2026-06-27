import { Building2, ShieldCheck, Star, MapPin } from "lucide-react";
import { Link } from "react-router";
import { Supplier } from "../data/suppliers";
import { COUNTRIES } from "../data/countries";
import { PRODUCTS } from "../data/products";
import { useLanguage, t } from "../contexts/LanguageContext";

interface SupplierCardProps {
  supplier: Supplier;
}

export function SupplierCard({ supplier }: SupplierCardProps) {
  const { language } = useLanguage();
  const country = COUNTRIES.find((c) => c.id === supplier.countryId);
  const productCount = PRODUCTS.filter((p) => p.supplierId === supplier.id).length;

  return (
    <Link to={`/suppliers/${supplier.id}`}>
      <article className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow duration-200 flex flex-col h-full">
        <div className="relative h-32 bg-muted overflow-hidden">
          <img
            src={supplier.imageUrl}
            alt={supplier.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {supplier.verified && (
            <div className="absolute top-2 right-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3" />
                {t("verified", language)}
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4 flex flex-col gap-2 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-foreground leading-snug" style={{ fontSize: "0.95rem" }}>
              {supplier.name}
            </h3>
            <Building2 className="w-4 h-4 text-muted-foreground shrink-0" />
          </div>
          
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span className="font-semibold" style={{ color: country?.color }}>
              {country?.code}
            </span>
            <span>•</span>
            <span>{supplier.city}</span>
          </div>
          
          <p className="text-xs text-muted-foreground line-clamp-2">
            {supplier.description[language]}
          </p>
          
          <div className="mt-auto pt-3 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold">{supplier.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {productCount} {t("productsCount", language)}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
