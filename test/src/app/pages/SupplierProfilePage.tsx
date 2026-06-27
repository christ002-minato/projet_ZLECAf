import { useParams, Link } from "react-router";
import { MapPin, Star, ShieldCheck, Mail, Phone, Calendar, ArrowLeft, Building2 } from "lucide-react";
import { SUPPLIERS } from "../data/suppliers";
import { COUNTRIES } from "../data/countries";
import { PRODUCTS, type Product } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { ProductOrderDialog } from "../components/ProductOrderDialog";
import { useLanguage, t } from "../contexts/LanguageContext";
import { useState } from "react";

export function SupplierProfilePage() {
  const { id } = useParams();
  const { language } = useLanguage();
  const [countryId] = useState(() => {
    return localStorage.getItem("afrimarket-country") || "sn";
  });
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  
  const supplier = SUPPLIERS.find((s) => s.id === id);
  
  if (!supplier) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t("notFound", language)}</h1>
          <Link to="/" className="text-primary hover:underline">
            {t("backToHome", language)}
          </Link>
        </div>
      </div>
    );
  }
  
  const country = COUNTRIES.find((c) => c.id === supplier.countryId);
  const supplierProducts = PRODUCTS.filter((p) => p.supplierId === supplier.id);
  const joinedYear = new Date(supplier.joinedDate).getFullYear();

  return (
    <div className="min-h-screen bg-background">
      {/* Back button */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            to="/suppliers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("suppliers", language)}
          </Link>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-green-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="relative">
              <img
                src={supplier.imageUrl}
                alt={supplier.name}
                className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
              />
              {supplier.verified && (
                <div className="absolute -bottom-2 -right-2 bg-green-600 rounded-full p-2 shadow-lg">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-3xl font-black mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
                    {supplier.name}
                  </h1>
                  
                  <div className="flex items-center gap-3 flex-wrap mb-3">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="font-semibold text-sm" style={{ color: country?.color }}>
                        {country?.name[language]}
                      </span>
                      <span className="text-sm text-muted-foreground">• {supplier.city}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-sm">{supplier.rating.toFixed(1)}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {t("memberSince", language)} {joinedYear}
                      </span>
                    </div>
                  </div>
                  
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-muted rounded-full text-xs font-semibold mb-4">
                    <Building2 className="w-3.5 h-3.5" />
                    {t(supplier.type, language)}
                  </div>
                  
                  <p className="text-muted-foreground max-w-2xl leading-relaxed">
                    {supplier.description[language]}
                  </p>
                </div>
                
                {/* Contact button */}
                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {t("contactSupplier", language)}
                </button>
              </div>
              
              {/* Contact info */}
              <div className="mt-6 flex flex-wrap gap-4">
                {supplier.contactInfo.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{supplier.contactInfo.email}</span>
                  </div>
                )}
                {supplier.contactInfo.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{supplier.contactInfo.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">
          {t("supplierProducts", language)} ({supplierProducts.length})
        </h2>
        
        {supplierProducts.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">
            Aucun produit disponible pour le moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {supplierProducts.map((product) => (
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
