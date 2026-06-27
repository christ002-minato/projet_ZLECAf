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
      {/* Header sticky - version fullPage */}
      <div className={fullPage ? "sticky top-0 z-20 bg-white border-b border-border px-6 py-3 xl:px-10" : "hidden"}>
        <button onClick={onClose} className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour aux produits
        </button>
      </div>

      {/* Wrapper global : centré mais large sur PC */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-6 p-4 md:p-6 xl:gap-10 xl:p-10">

          {/* ── Colonne gauche : galerie ── */}
          <div>
            <div className="aspect-[4/3] overflow-hidden rounded-xl bg-muted xl:rounded-2xl">
              <img
                src={selectedImage}
                alt={product.name[language]}
                className="w-full h-full object-cover"
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-2 xl:mt-4 xl:gap-3">
                {gallery.map((image) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    className={`aspect-square overflow-hidden rounded-lg border xl:rounded-xl ${
                      selectedImage === image ? "border-primary border-2" : "border-border"
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Colonne droite : contenu ── */}
          <div className="min-w-0">

            {/* ══ ÉTAPE 1 : Fiche produit ══ */}
            {step === "details" && (
              <div className="space-y-5 xl:space-y-7">
                {/* En-tête produit */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {category && (
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1 text-xs font-bold xl:text-sm">
                        <category.Icon className="w-3.5 h-3.5 text-primary xl:w-4 xl:h-4" />
                        {t(category.id, language)}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#1E4D3B]/5 px-3 py-1 text-xs font-bold text-[#1E4D3B] xl:text-sm">
                      <ShieldCheck className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                      Sans taxe
                    </span>
                  </div>

                  {/* Titre : plus grand sur PC */}
                  <h1 className="text-2xl md:text-3xl xl:text-4xl font-black leading-tight">
                    {product.name[language]}
                  </h1>

                  {supplier && (
                    <Link
                      to={`/suppliers/${supplier.id}`}
                      className="mt-3 inline-flex items-center gap-2 text-sm xl:text-base font-bold text-muted-foreground hover:text-primary"
                    >
                      <Building2 className="w-4 h-4" />
                      {supplier.name}
                      <span style={{ color: supplierCountry?.color }}>{supplierCountry?.name[language]}</span>
                    </Link>
                  )}
                </div>

                {/* Description : plus lisible sur PC */}
                <p className="text-muted-foreground leading-relaxed xl:text-base xl:leading-loose">
                  {product.description[language]}
                </p>

                {/* Commande minimum */}
                <div className="rounded-xl border border-border bg-card p-4 xl:p-5">
                  <div className="flex items-center gap-2 text-sm xl:text-base font-bold text-muted-foreground mb-2">
                    <Package className="w-4 h-4" />
                    Commande minimum
                  </div>
                  <div className="text-2xl xl:text-3xl font-black">
                    {product.minQty} {product.unit[language]}
                  </div>
                </div>

                {/* Comparaison de prix */}
                <div className="rounded-xl border-2 border-primary/25 bg-white p-4 xl:p-6">
                  <div className="mb-4">
                    <h2 className="text-xl xl:text-2xl font-black">Comparaison de prix</h2>
                    <p className="text-sm xl:text-base text-muted-foreground">
                      Prix affiches en {buyerCountry.currencyCode}, avec equivalent USD.
                    </p>
                  </div>

                  {/* 3 cards côte à côte sur PC */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 xl:gap-4">
                    {/* ZLECAf */}
                    <div className="rounded-xl bg-[#1E4D3B]/5 border border-[#1E4D3B]/20 p-4 xl:p-5">
                      <div className="text-xs xl:text-sm font-black text-[#1E4D3B] mb-2">
                        Prix entre pays africains
                      </div>
                      <div className="text-2xl xl:text-3xl font-black text-[#1E4D3B]">
                        {prices.zlecaf.local}
                      </div>
                      <div className="text-xs xl:text-sm text-muted-foreground">{prices.zlecaf.usd}</div>
                      <span className="mt-3 inline-flex rounded-full bg-[#1E4D3B] px-3 py-1 text-xs font-bold text-white">
                        Sans taxe
                      </span>
                    </div>

                    {/* International */}
                    <div className="rounded-xl bg-muted border border-border p-4 xl:p-5">
                      <div className="text-xs xl:text-sm font-black text-muted-foreground mb-2">
                        Tarif international standard
                      </div>
                      <div className="text-2xl xl:text-3xl font-black text-muted-foreground line-through">
                        {prices.international.local}
                      </div>
                      <div className="text-xs xl:text-sm text-muted-foreground">
                        {prices.international.usd} avec +{prices.tariffPercent}% simule
                      </div>
                    </div>

                    {/* Économie */}
                    <div className="rounded-xl bg-[#D2A63B]/10 border border-[#D2A63B]/30 p-4 xl:p-5">
                      <div className="text-xs xl:text-sm font-black text-[#6F4223] mb-2">
                        Economie realisee
                      </div>
                      <div className="text-xl xl:text-2xl font-black text-[#6F4223]">
                        Vous economisez {prices.saving.local}
                      </div>
                      <div className="text-xs xl:text-sm text-muted-foreground">
                        {prices.saving.usd} soit {prices.savingPercent}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Livraison */}
                <div className="rounded-xl border border-border bg-card p-4 xl:p-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xl:gap-6">
                    <div>
                      <div className="flex items-center gap-2 text-sm xl:text-base font-bold mb-1">
                        <Clock className="w-4 h-4 text-primary" />
                        Delai estime
                      </div>
                      <p className="text-sm xl:text-base text-muted-foreground">
                        Livre en {product.delivery.minDays} a {product.delivery.maxDays} jours
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-sm xl:text-base font-bold mb-1">
                        <Truck className="w-4 h-4 text-primary" />
                        Mode de livraison
                      </div>
                      <p className="text-sm xl:text-base text-muted-foreground">
                        {product.delivery.method[language]}
                      </p>
                    </div>
                    <div>
                      <div className="text-sm xl:text-base font-bold mb-1">Zone couverte</div>
                      <p className="text-sm xl:text-base text-muted-foreground">
                        {product.delivery.coverageZone[language]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Commander */}
                <button
                  type="button"
                  onClick={() => setStep("order")}
                  className="w-full bg-primary text-white rounded-xl py-4 xl:py-5 text-lg xl:text-xl font-black hover:bg-[#163d2e] transition-colors inline-flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5 xl:w-6 xl:h-6" />
                  Commander
                </button>
              </div>
            )}

            {/* ══ ÉTAPE 2 : Formulaire commande ══ */}
            {step === "order" && (
              <form onSubmit={submitOrder} className="space-y-5 xl:space-y-7">
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="text-sm xl:text-base font-bold text-primary hover:underline"
                >
                  ← Retour a la fiche produit
                </button>

                <h2 className="text-2xl xl:text-3xl font-black">Finaliser la commande</h2>

                {/* Quantité */}
                <div className="rounded-xl border border-border bg-card p-4 xl:p-5">
                  <label className="text-sm xl:text-base font-bold">Quantite</label>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQuantity((current) => Math.max(product.minQty, current - 1))}
                      className="w-11 h-11 xl:w-12 xl:h-12 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min={product.minQty}
                      value={quantity}
                      onChange={(event) => setQuantity(Math.max(product.minQty, Number(event.target.value)))}
                      className="w-28 xl:w-32 bg-muted rounded-lg px-3 py-3 text-center font-black outline-none xl:text-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity((current) => current + 1)}
                      className="w-11 h-11 xl:w-12 xl:h-12 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <span className="text-sm xl:text-base text-muted-foreground">
                      Minimum {product.minQty} {product.unit[language]}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="rounded-xl border-2 border-primary/25 bg-[#1E4D3B]/5 p-4 xl:p-6">
                  <div className="text-sm xl:text-base font-bold text-[#1E4D3B]">Total ZLECAf</div>
                  <div className="mt-1 text-3xl xl:text-4xl font-black text-[#1E4D3B]">
                    {prices.total.local}
                  </div>
                  <div className="text-sm xl:text-base text-muted-foreground">
                    {prices.zlecaf.local} x {quantity} {product.unit[language]} = {prices.total.usd}
                  </div>
                </div>

                {/* Adresse */}
                <label className="block">
                  <span className="text-sm xl:text-base font-bold">Adresse de livraison</span>
                  <textarea
                    required
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    className="mt-2 w-full min-h-24 xl:min-h-32 bg-muted rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary xl:text-base"
                    placeholder="Pays, ville, quartier, contact de reception"
                  />
                </label>

                {/* Info livraison */}
                <div className="rounded-xl border border-border bg-card p-4 xl:p-5">
                  <div className="flex items-center gap-2 font-bold xl:text-base">
                    <Truck className="w-4 h-4 text-primary" />
                    Livraison estimee pour cette commande
                  </div>
                  <p className="mt-1 text-sm xl:text-base text-muted-foreground">
                    {product.delivery.minDays} a {product.delivery.maxDays} jours via {product.delivery.method[language]}.
                  </p>
                </div>

                {/* CTA Confirmer */}
                <button
                  type="submit"
                  className="w-full bg-primary text-white rounded-xl py-4 xl:py-5 text-lg xl:text-xl font-black hover:bg-[#163d2e] transition-colors"
                >
                  Confirmer la commande
                </button>
              </form>
            )}

            {/* ══ ÉTAPE 3 : Confirmation ══ */}
            {step === "confirmed" && (
              <div className="rounded-xl border border-[#1E4D3B]/20 bg-[#1E4D3B]/5 p-6 xl:p-10 text-center">
                <CheckCircle2 className="w-14 h-14 xl:w-20 xl:h-20 text-[#1E4D3B] mx-auto mb-4" />
                <h2 className="text-2xl xl:text-3xl font-black text-[#163d2e]">
                  Votre commande est envoyee au fournisseur
                </h2>
                <p className="mt-3 xl:mt-4 text-muted-foreground xl:text-base">
                  Numero de commande simule
                </p>
                <div className="mt-2 text-3xl xl:text-4xl font-black text-[#1E4D3B]">
                  {orderNumber}
                </div>
                <button
                  type="button"
                  onClick={onClose ?? (() => setStep("details"))}
                  className="mt-6 xl:mt-8 bg-primary text-white rounded-xl px-8 py-3 xl:py-4 xl:text-lg font-black hover:bg-[#163d2e] transition-colors"
                >
                  Terminer
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export function findProductById(id: string | undefined) {
  return PRODUCTS.find((product) => product.id === Number(id));
}