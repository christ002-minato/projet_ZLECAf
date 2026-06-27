import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Clock,
  Minus,
  Package,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { PRODUCTS, type Product } from "../data/products";
import { CATEGORIES } from "../data/categories";
import { SUPPLIERS } from "../data/suppliers";
import { COUNTRIES } from "../data/countries";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage, t } from "../contexts/LanguageContext";
import { formatLocalPrice, getBuyerCountry } from "../utils/pricing";

interface ProductOrderPanelProps {
  product: Product;
  countryId: string;
  onClose?: () => void;
  fullPage?: boolean;
}

function buildOrderNumber() {
  return `AM-${Date.now().toString().slice(-6)}`;
}

export function ProductOrderPanel({ product, countryId, onClose, fullPage = false }: ProductOrderPanelProps) {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(product.gallery?.[0] ?? product.imageUrl);
  const [step, setStep] = useState<"details" | "order" | "confirmed">("details");
  const [quantity, setQuantity] = useState(product.minQty);
  const [address, setAddress] = useState(user ? `${user.fullName} - adresse a confirmer` : "");
  const [orderNumber, setOrderNumber] = useState("");

  const supplier = SUPPLIERS.find((item) => item.id === product.supplierId);
  const supplierCountry = COUNTRIES.find((country) => country.id === supplier?.countryId);
  const category = CATEGORIES.find((item) => item.id === product.category);
  const gallery = product.gallery?.length ? product.gallery : [product.imageUrl];
  const buyerCountry = getBuyerCountry(countryId);

  const prices = useMemo(() => {
    const unitZlecafUsd = product.priceUsd;
    const unitInternationalUsd = product.priceUsd * (1 + product.internationalTariffRate);
    const savingUsd = unitInternationalUsd - unitZlecafUsd;
    const totalUsd = unitZlecafUsd * quantity;

    return {
      zlecaf: formatLocalPrice(unitZlecafUsd, countryId, language),
      international: formatLocalPrice(unitInternationalUsd, countryId, language),
      saving: formatLocalPrice(savingUsd, countryId, language),
      total: formatLocalPrice(totalUsd, countryId, language),
      savingPercent: Math.round(product.internationalTariffRate * 100),
      tariffPercent: Math.round(product.internationalTariffRate * 100),
    };
  }, [countryId, language, product.internationalTariffRate, product.priceUsd, quantity]);

  const submitOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOrderNumber(buildOrderNumber());
    setStep("confirmed");
  };

  return (
    <div className={fullPage ? "min-h-screen bg-background" : "bg-background"}>
      <div className={fullPage ? "sticky top-0 z-20 bg-white border-b border-border px-4 py-3" : "hidden"}>
        <button onClick={onClose} className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground">
          <ArrowLeft className="w-4 h-4" />
          Retour aux produits
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.25fr] gap-6 p-4 md:p-6">
        <div>
          <div className="aspect-[4/3] overflow-hidden rounded-xl bg-muted">
            <img src={selectedImage} alt={product.name[language]} className="w-full h-full object-cover" />
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {gallery.map((image) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className={`aspect-square overflow-hidden rounded-lg border ${
                    selectedImage === image ? "border-primary" : "border-border"
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="min-w-0">
          {step === "details" && (
            <div className="space-y-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {category && (
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1 text-xs font-bold">
                      <category.Icon className="w-3.5 h-3.5 text-primary" />
                      {t(category.id, language)}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Sans taxe
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black leading-tight">{product.name[language]}</h1>
                {supplier && (
                  <Link
                    to={`/suppliers/${supplier.id}`}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary"
                  >
                    <Building2 className="w-4 h-4" />
                    {supplier.name}
                    <span style={{ color: supplierCountry?.color }}>{supplierCountry?.name[language]}</span>
                  </Link>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed">{product.description[language]}</p>

              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground mb-2">
                  <Package className="w-4 h-4" />
                  Commande minimum
                </div>
                <div className="text-2xl font-black">
                  {product.minQty} {product.unit[language]}
                </div>
              </div>

              <div className="rounded-xl border-2 border-primary/25 bg-white p-4">
                <div className="mb-4">
                  <h2 className="text-xl font-black">Comparaison de prix</h2>
                  <p className="text-sm text-muted-foreground">
                    Prix affiches en {buyerCountry.currencyCode}, avec equivalent USD.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="rounded-xl bg-green-50 border border-green-200 p-4">
                    <div className="text-xs font-black text-green-700 mb-2">Prix entre pays africains</div>
                    <div className="text-2xl font-black text-green-700">{prices.zlecaf.local}</div>
                    <div className="text-xs text-muted-foreground">{prices.zlecaf.usd}</div>
                    <span className="mt-3 inline-flex rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white">
                      Sans taxe
                    </span>
                  </div>
                  <div className="rounded-xl bg-muted border border-border p-4">
                    <div className="text-xs font-black text-muted-foreground mb-2">Tarif international standard</div>
                    <div className="text-2xl font-black text-muted-foreground line-through">
                      {prices.international.local}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {prices.international.usd} avec +{prices.tariffPercent}% simule
                    </div>
                  </div>
                  <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
                    <div className="text-xs font-black text-amber-800 mb-2">Economie realisee</div>
                    <div className="text-2xl font-black text-amber-700">Vous economisez {prices.saving.local}</div>
                    <div className="text-xs text-muted-foreground">
                      {prices.saving.usd} soit {prices.savingPercent}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-bold mb-1">
                      <Clock className="w-4 h-4 text-primary" />
                      Delai estime
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Livre en {product.delivery.minDays} a {product.delivery.maxDays} jours
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm font-bold mb-1">
                      <Truck className="w-4 h-4 text-primary" />
                      Mode de livraison
                    </div>
                    <p className="text-sm text-muted-foreground">{product.delivery.method[language]}</p>
                  </div>
                  <div>
                    <div className="text-sm font-bold mb-1">Zone couverte</div>
                    <p className="text-sm text-muted-foreground">{product.delivery.coverageZone[language]}</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep("order")}
                className="w-full bg-primary text-white rounded-xl py-4 text-lg font-black hover:bg-green-700 transition-colors inline-flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Commander
              </button>
            </div>
          )}

          {step === "order" && (
            <form onSubmit={submitOrder} className="space-y-5">
              <button type="button" onClick={() => setStep("details")} className="text-sm font-bold text-primary">
                Retour a la fiche produit
              </button>
              <h2 className="text-2xl font-black">Finaliser la commande</h2>

              <div className="rounded-xl border border-border bg-card p-4">
                <label className="text-sm font-bold">Quantite</label>
                <div className="mt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity((current) => Math.max(product.minQty, current - 1))}
                    className="w-11 h-11 rounded-lg border border-border flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min={product.minQty}
                    value={quantity}
                    onChange={(event) => setQuantity(Math.max(product.minQty, Number(event.target.value)))}
                    className="w-28 bg-muted rounded-lg px-3 py-3 text-center font-black outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((current) => current + 1)}
                    className="w-11 h-11 rounded-lg border border-border flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-muted-foreground">
                    Minimum {product.minQty} {product.unit[language]}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border-2 border-primary/25 bg-green-50 p-4">
                <div className="text-sm font-bold text-green-700">Total ZLECAf</div>
                <div className="mt-1 text-3xl font-black text-green-700">{prices.total.local}</div>
                <div className="text-sm text-muted-foreground">
                  {prices.zlecaf.local} x {quantity} {product.unit[language]} = {prices.total.usd}
                </div>
              </div>

              <label className="block">
                <span className="text-sm font-bold">Adresse de livraison</span>
                <textarea
                  required
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  className="mt-2 w-full min-h-24 bg-muted rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Pays, ville, quartier, contact de reception"
                />
              </label>

              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 font-bold">
                  <Truck className="w-4 h-4 text-primary" />
                  Livraison estimee pour cette commande
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {product.delivery.minDays} a {product.delivery.maxDays} jours via {product.delivery.method[language]}.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white rounded-xl py-4 text-lg font-black hover:bg-green-700 transition-colors"
              >
                Confirmer la commande
              </button>
            </form>
          )}

          {step === "confirmed" && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
              <CheckCircle2 className="w-14 h-14 text-green-700 mx-auto mb-4" />
              <h2 className="text-2xl font-black text-green-800">Votre commande est envoyee au fournisseur</h2>
              <p className="mt-3 text-muted-foreground">Numero de commande simule</p>
              <div className="mt-2 text-3xl font-black text-green-700">{orderNumber}</div>
              <button
                type="button"
                onClick={onClose ?? (() => setStep("details"))}
                className="mt-6 bg-primary text-white rounded-xl px-6 py-3 font-black hover:bg-green-700 transition-colors"
              >
                Terminer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function findProductById(id: string | undefined) {
  return PRODUCTS.find((product) => product.id === Number(id));
}
