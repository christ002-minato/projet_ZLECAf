import { useNavigate, useParams } from "react-router";
import { ProductOrderPanel, findProductById } from "../components/ProductOrderPanel";
import { useLanguage, t } from "../contexts/LanguageContext";

export function ProductDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { language } = useLanguage();
  const countryId = localStorage.getItem("afrimarket-country") || "sn";
  const product = findProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center">
        <div>
          <h1 className="text-2xl font-black mb-3">{t("notFound", language)}</h1>
          <button onClick={() => navigate("/products")} className="text-primary font-bold hover:underline">
            {t("products", language)}
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProductOrderPanel
      product={product}
      countryId={countryId}
      fullPage
      onClose={() => navigate("/products")}
    />
  );
}
