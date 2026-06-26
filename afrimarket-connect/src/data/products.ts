export interface Product {
  id: string;
  nameFr: string;
  nameEn: string;
  descriptionFr: string;
  descriptionEn: string;
  categoryFr: string;
  categoryEn: string;
  supplierName: string;
  countryId: string;
  priceUsd: number; // base B2B price per unit
  unitFr: string;
  unitEn: string;
  rating: number;
  compliesWithAfCFTA: boolean; // Conforme Règle d'Origine ZLECAf
  preferentialTariffUsd: number; // Cost with ZLECAf tariff reduction (e.g. 0%-2% tariff)
  standardTariffUsd: number; // Cost with standard non-African MFN tariff (e.g. 15%-25% tariff)
  leadTimeDays: number;
  minOrderQuantity: number;
  imageColor: string; // Dynamic B2B placeholder color
}

export const PRODUCTS: Product[] = [
  {
    id: "prod_1",
    nameFr: "Textiles en Wax de Dakar",
    nameEn: "Dakar Premium Wax Textiles",
    descriptionFr: "Tissus en coton wax de haute qualité, motifs traditionnels africains, teintures certifiées longue durée pour confections de masse.",
    descriptionEn: "High-quality cotton wax fabrics, traditional African designs, certified long-lasting dyes for mass apparel production.",
    categoryFr: "Textile & Mode",
    categoryEn: "Textiles & Fashion",
    supplierName: "Dakar Textiles Sarl",
    countryId: "senegal",
    priceUsd: 1200,
    unitFr: "Lot de 500 mètres",
    unitEn: "Batch of 500 meters",
    rating: 4.8,
    compliesWithAfCFTA: true,
    preferentialTariffUsd: 1200, // ZLECAf duty-free
    standardTariffUsd: 1440, // +20% standard tariff outside
    leadTimeDays: 14,
    minOrderQuantity: 5,
    imageColor: "from-green-500 to-yellow-500"
  },
  {
    id: "prod_2",
    nameFr: "Fèves de Cacao Premium d'Abidjan",
    nameEn: "Abidjan Premium Cocoa Beans",
    descriptionFr: "Fèves de cacao séchées au soleil, fermentées de manière traditionnelle. Idéales pour les chocolatiers et transformateurs industriels.",
    descriptionEn: "Sun-dried, traditionally fermented cocoa beans. Perfect for chocolate makers and industrial food processors.",
    categoryFr: "Agriculture & Agroalimentaire",
    categoryEn: "Agriculture & Food",
    supplierName: "Abidjan Cocoa Union Co-op",
    countryId: "cote_divoire",
    priceUsd: 3200,
    unitFr: "Tonne Métrique",
    unitEn: "Metric Ton",
    rating: 4.9,
    compliesWithAfCFTA: true,
    preferentialTariffUsd: 3200, // ZLECAf duty-free
    standardTariffUsd: 3840, // +20% standard tariff outside
    leadTimeDays: 20,
    minOrderQuantity: 10,
    imageColor: "from-orange-500 to-amber-700"
  },
  {
    id: "prod_3",
    nameFr: "Composants Électroniques de Casablanca",
    nameEn: "Casablanca Electronic Boards",
    descriptionFr: "Cartes de circuits imprimés multicouches prêtes pour l'assemblage d'équipements de télécommunication et domotiques.",
    descriptionEn: "Multi-layer printed circuit boards (PCB) assembled and ready for telecom and smart-home equipment builders.",
    categoryFr: "Électronique & Technologie",
    categoryEn: "Electronics & Tech",
    supplierName: "Casa SmartTech Electronics",
    countryId: "maroc",
    priceUsd: 45,
    unitFr: "Unité (Min 200 unités)",
    unitEn: "Unit (Min 200 units)",
    rating: 4.7,
    compliesWithAfCFTA: true,
    preferentialTariffUsd: 45.5, // ZLECAf 1% admin fee
    standardTariffUsd: 54.0, // +18% standard tariff outside
    leadTimeDays: 10,
    minOrderQuantity: 200,
    imageColor: "from-red-600 to-emerald-700"
  },
  {
    id: "prod_4",
    nameFr: "Café Arabica Sidamo Lavé Bio",
    nameEn: "Organic Washed Sidamo Arabica Coffee",
    descriptionFr: "Café de spécialité cultivé à haute altitude, arômes floraux et notes d'agrumes intenses. Certifié commerce équitable.",
    descriptionEn: "Specialty coffee grown at high altitude, intense floral aromas and citrus notes. Fairtrade certified.",
    categoryFr: "Agriculture & Agroalimentaire",
    categoryEn: "Agriculture & Food",
    supplierName: "Abyssinia Premium Coffee Exporters",
    countryId: "ethiopie",
    priceUsd: 4200,
    unitFr: "Tonne Métrique",
    unitEn: "Metric Ton",
    rating: 4.9,
    compliesWithAfCFTA: true,
    preferentialTariffUsd: 4200,
    standardTariffUsd: 4950, // +18% standard tariff outside
    leadTimeDays: 25,
    minOrderQuantity: 5,
    imageColor: "from-blue-500 to-emerald-600"
  },
  {
    id: "prod_5",
    nameFr: "Ciment Portland Supérieur CEM I",
    nameEn: "Superior Portland Cement CEM I",
    descriptionFr: "Ciment à haute résistance mécanique pour ouvrages d'art, bâtiments industriels et infrastructures d'envergure nationale.",
    descriptionEn: "High-strength cement for civil engineering, industrial buildings, and large-scale infrastructure projects.",
    categoryFr: "Matériaux de Construction",
    categoryEn: "Construction Materials",
    supplierName: "Naija Cement Distributors Ltd",
    countryId: "nigeria",
    priceUsd: 85,
    unitFr: "Tonne (Palette de sacs de 50kg)",
    unitEn: "Ton (Pallet of 50kg bags)",
    rating: 4.6,
    compliesWithAfCFTA: true,
    preferentialTariffUsd: 85,
    standardTariffUsd: 106, // +25% standard tariff outside
    leadTimeDays: 7,
    minOrderQuantity: 50,
    imageColor: "from-green-700 to-neutral-500"
  },
  {
    id: "prod_6",
    nameFr: "Thé Noir de Kericho Grade BP1",
    nameEn: "Kericho Black Tea Grade BP1",
    descriptionFr: "Thé noir kényan réputé mondialement pour sa force, sa liqueur dorée et son arôme riche, idéal pour les marques d'infusions.",
    descriptionEn: "Kenyan black tea globally renowned for its strength, rich golden color, and full flavor, perfect for tea blenders.",
    categoryFr: "Agriculture & Agroalimentaire",
    categoryEn: "Agriculture & Food",
    supplierName: "Rift Valley Tea Growers",
    countryId: "kenya",
    priceUsd: 2800,
    unitFr: "Tonne Métrique",
    unitEn: "Metric Ton",
    rating: 4.8,
    compliesWithAfCFTA: true,
    preferentialTariffUsd: 2800,
    standardTariffUsd: 3360, // +20% standard tariff outside
    leadTimeDays: 12,
    minOrderQuantity: 5,
    imageColor: "from-red-600 to-green-600"
  },
  {
    id: "prod_7",
    nameFr: "Huile d'Argan Cosmétique Bio",
    nameEn: "Organic Cosmetic Argan Oil",
    descriptionFr: "Huile d'argan 100% pure extraite à froid, riche en vitamine E. Parfaite pour l'industrie de la beauté et du soin de la peau.",
    descriptionEn: "100% pure cold-pressed argan oil, rich in Vitamin E. Perfect for beauty and skincare manufacturing brands.",
    categoryFr: "Produits Chimiques & Cosmétiques",
    categoryEn: "Chemicals & Cosmetics",
    supplierName: "Souss Argan Export",
    countryId: "maroc",
    priceUsd: 15,
    unitFr: "Litre (Vrac, fût de 200L)",
    unitEn: "Liter (Bulk, 200L drum)",
    rating: 4.9,
    compliesWithAfCFTA: true,
    preferentialTariffUsd: 15,
    standardTariffUsd: 18.5, // +23% standard tariff outside
    leadTimeDays: 15,
    minOrderQuantity: 200,
    imageColor: "from-yellow-600 to-red-600"
  },
  {
    id: "prod_8",
    nameFr: "Fil de Coton Égyptien Peigné Giza 86",
    nameEn: "Giza 86 Combed Egyptian Cotton Yarn",
    descriptionFr: "Fil de coton égyptien de luxe à très longues fibres pour tissage haut de gamme, douceur et résistance incomparables.",
    descriptionEn: "Luxury long-staple Egyptian cotton yarn for premium weaving, offering unmatched softness and high tensile strength.",
    categoryFr: "Textile & Mode",
    categoryEn: "Textiles & Fashion",
    supplierName: "Nile Cotton Spinning Mills",
    countryId: "egypte",
    priceUsd: 6200,
    unitFr: "Tonne Métrique",
    unitEn: "Metric Ton",
    rating: 4.8,
    compliesWithAfCFTA: true,
    preferentialTariffUsd: 6200,
    standardTariffUsd: 7130, // +15% standard tariff outside
    leadTimeDays: 18,
    minOrderQuantity: 2,
    imageColor: "from-yellow-700 to-neutral-800"
  },
  {
    id: "prod_9",
    nameFr: "Cuirs et Peaux de Mouton Tannés d'Addis",
    nameEn: "Addis Sheepskin Finished Leather",
    descriptionFr: "Cuir souple pleine fleur, tanné localement avec des procédés éco-responsables, destiné aux fabricants de chaussures et sacs.",
    descriptionEn: "Supple full-grain sheepskin leather, tanned locally using eco-friendly processes, designed for shoe and bag makers.",
    categoryFr: "Textile & Mode",
    categoryEn: "Textiles & Fashion",
    supplierName: "Ethiopian Highlands Tanners",
    countryId: "ethiopie",
    priceUsd: 25,
    unitFr: "Mètre Carré",
    unitEn: "Square Meter",
    rating: 4.5,
    compliesWithAfCFTA: true,
    preferentialTariffUsd: 25,
    standardTariffUsd: 29.5, // +18% standard tariff outside
    leadTimeDays: 22,
    minOrderQuantity: 100,
    imageColor: "from-blue-600 to-amber-600"
  },
  {
    id: "prod_10",
    nameFr: "Huile de Palme brute raffinée d'Afrique de l'Ouest",
    nameEn: "Refined West African Palm Oil",
    descriptionFr: "Huile végétale désodorisée de qualité alimentaire, riche en antioxydants, idéale pour l'industrie de la margarine et de la biscuiterie.",
    descriptionEn: "Deodorized food-grade vegetable oil, rich in antioxidants, perfect for industrial margarine and biscuit manufacturing.",
    categoryFr: "Agriculture & Agroalimentaire",
    categoryEn: "Agriculture & Food",
    supplierName: "Gold Coast Agro-Industrial Ltd",
    countryId: "ghana",
    priceUsd: 1100,
    unitFr: "Tonne Métrique",
    unitEn: "Metric Ton",
    rating: 4.6,
    compliesWithAfCFTA: true,
    preferentialTariffUsd: 1100,
    standardTariffUsd: 1298, // +18% standard tariff outside
    leadTimeDays: 14,
    minOrderQuantity: 10,
    imageColor: "from-red-500 to-amber-500"
  },
  {
    id: "prod_11",
    nameFr: "Moût de Raisin Concentré de Stellenbosch",
    nameEn: "Stellenbosch Concentrated Grape Must",
    descriptionFr: "Moût de raisin pur pour la vinification industrielle ou la production de jus, régulé et filtré selon les normes internationales.",
    descriptionEn: "Pure grape must for industrial winery blending or juice production, stabilized and filtered under international standards.",
    categoryFr: "Agriculture & Agroalimentaire",
    categoryEn: "Agriculture & Food",
    supplierName: "Stellenbosch Bulk Liquid Co",
    countryId: "afrique_du_sud",
    priceUsd: 950,
    unitFr: "Kilolitre (1000 Litres)",
    unitEn: "Kiloliter (1000 Liters)",
    rating: 4.7,
    compliesWithAfCFTA: true,
    preferentialTariffUsd: 950,
    standardTariffUsd: 1140, // +20% standard tariff outside
    leadTimeDays: 30,
    minOrderQuantity: 5,
    imageColor: "from-green-600 to-amber-800"
  },
  {
    id: "prod_12",
    nameFr: "Engrais Urée 46% Granulée d'Arzew",
    nameEn: "Arzew Prilled Urea 46% Fertilizer",
    descriptionFr: "Engrais azoté à haute concentration, granulométrie calibrée pour épandage mécanique uniforme, augmentant les rendements agricoles.",
    descriptionEn: "High-concentration nitrogen fertilizer, calibrated granule size for uniform mechanical spreading, maximizing agricultural yields.",
    categoryFr: "Produits Chimiques & Cosmétiques",
    categoryEn: "Chemicals & Cosmetics",
    supplierName: "Fertial Algérie Spa",
    countryId: "algerie",
    priceUsd: 380,
    unitFr: "Tonne Métrique (Sacs de 1000kg)",
    unitEn: "Metric Ton (1000kg Bulk Bags)",
    rating: 4.4,
    compliesWithAfCFTA: true,
    preferentialTariffUsd: 380,
    standardTariffUsd: 437, // +15% standard tariff outside
    leadTimeDays: 14,
    minOrderQuantity: 20,
    imageColor: "from-emerald-800 to-zinc-400"
  },
  {
    id: "prod_13",
    nameFr: "Amandes de Noix de Cajou (Grade W320)",
    nameEn: "Cashew Kernels (Grade W320)",
    descriptionFr: "Noix de cajou entières blanches, pelées, séchées et calibrées de manière rigoureuse au Bénin pour l'industrie agroalimentaire.",
    descriptionEn: "Whole white cashew kernels, rigorously shelled, dried, and graded in Benin for snacks or confectionery processing.",
    categoryFr: "Agriculture & Agroalimentaire",
    categoryEn: "Agriculture & Food",
    supplierName: "Bénin Cashew Processing S.A.",
    countryId: "benin",
    priceUsd: 5900,
    unitFr: "Tonne Métrique",
    unitEn: "Metric Ton",
    rating: 4.7,
    compliesWithAfCFTA: true,
    preferentialTariffUsd: 5900,
    standardTariffUsd: 6785, // +15% standard tariff outside
    leadTimeDays: 16,
    minOrderQuantity: 3,
    imageColor: "from-green-600 to-yellow-600"
  },
  {
    id: "prod_14",
    nameFr: "Cathodes de Cuivre Pur 99.99% Grade-A",
    nameEn: "Grade-A Pure Copper Cathodes 99.99%",
    descriptionFr: "Plaques de cuivre pur raffinées électrolytiquement dans la Copperbelt, conformes aux exigences d'assemblage électrique et de câblerie.",
    descriptionEn: "Electrolytically refined pure copper sheets from the Copperbelt, meeting strict electric and cable manufacturing requirements.",
    categoryFr: "Matières Premières & Métaux",
    categoryEn: "Raw Materials & Metals",
    supplierName: "Copperbelt Refining Corporation",
    countryId: "zambie",
    priceUsd: 8400,
    unitFr: "Tonne Métrique",
    unitEn: "Metric Ton",
    rating: 4.9,
    compliesWithAfCFTA: true,
    preferentialTariffUsd: 8400,
    standardTariffUsd: 9240, // +10% standard tariff outside
    leadTimeDays: 21,
    minOrderQuantity: 25,
    imageColor: "from-amber-600 to-orange-800"
  },
  {
    id: "prod_15",
    nameFr: "Beurre de Karité Brut Bio de Bobo-Dioulasso",
    nameEn: "Organic Raw Shea Butter from Bobo-Dioulasso",
    descriptionFr: "Extrait de façon traditionnelle par des coopératives de femmes, beurre filtré et non raffiné, riche en nutriments cutanés.",
    descriptionEn: "Traditionally extracted by women cooperatives, filtered and unrefined shea butter, rich in skin-nourishing nutrients.",
    categoryFr: "Produits Chimiques & Cosmétiques",
    categoryEn: "Chemicals & Cosmetics",
    supplierName: "Karité Faso Co-op",
    countryId: "burkina_faso",
    priceUsd: 1400,
    unitFr: "Tonne Métrique",
    unitEn: "Metric Ton",
    rating: 4.8,
    compliesWithAfCFTA: true,
    preferentialTariffUsd: 1400,
    standardTariffUsd: 1722, // +23% standard tariff outside
    leadTimeDays: 15,
    minOrderQuantity: 2,
    imageColor: "from-red-500 to-green-600"
  },
  {
    id: "prod_16",
    nameFr: "Gousses de Vanille Bourbon de Mananara",
    nameEn: "Mananara Bourbon Vanilla Beans",
    descriptionFr: "Vanille noire gourmande de Madagascar, taux d'humidité optimal de 30-35%, taux de vanilline supérieur à 1.8%, arôme chocolaté.",
    descriptionEn: "Gourmet black vanilla from Madagascar, optimal 30-35% moisture content, vanillin content over 1.8%, rich chocolatey scent.",
    categoryFr: "Agriculture & Agroalimentaire",
    categoryEn: "Agriculture & Food",
    supplierName: "Mada Vanilla Co.",
    countryId: "madagascar",
    priceUsd: 180,
    unitFr: "Kilo (Sachet sous vide)",
    unitEn: "Kilo (Vacuum sealed pack)",
    rating: 4.9,
    compliesWithAfCFTA: true,
    preferentialTariffUsd: 180,
    standardTariffUsd: 216, // +20% standard tariff outside
    leadTimeDays: 14,
    minOrderQuantity: 10,
    imageColor: "from-emerald-700 to-zinc-900"
  }
];
