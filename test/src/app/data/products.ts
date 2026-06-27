// ─── PRODUCTS DATA ───────────────────────────────────────────────────────────

export interface Product {
  id: number;
  name: {
    fr: string;
    en: string;
    es: string;
    ar: string;
    pt: string;
  };
  category: string;
  country: string;
  priceUsd: number;
  rating: number;
  minQty: number;
  unit: {
    fr: string;
    en: string;
    es: string;
    ar: string;
    pt: string;
  };
  taxFree: boolean;
  imageUrl: string;
  gallery?: string[];
  internationalTariffRate: number;
  delivery: {
    minDays: number;
    maxDays: number;
    method: {
      fr: string;
      en: string;
      es: string;
      ar: string;
      pt: string;
    };
    coverageZone: {
      fr: string;
      en: string;
      es: string;
      ar: string;
      pt: string;
    };
  };
  supplierId: string;
  description: {
    fr: string;
    en: string;
    es: string;
    ar: string;
    pt: string;
  };
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: {
      fr: "Riz parfumé du Sénégal",
      en: "Senegalese Fragrant Rice",
      es: "Arroz perfumado de Senegal",
      ar: "أرز معطر من السنغال",
      pt: "Arroz perfumado do Senegal",
    },
    category: "agriculture",
    country: "sn",
    priceUsd: 1.20,
    rating: 4.5,
    minQty: 100,
    unit: {
      fr: "kg",
      en: "kg",
      es: "kg",
      ar: "كجم",
      pt: "kg",
    },
    taxFree: true,
    imageUrl: "https://images.unsplash.com/photo-1773858437375-e49a91b73ff1?w=400&h=280&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1773858437375-e49a91b73ff1?w=900&h=620&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=900&h=620&fit=crop&auto=format",
    ],
    internationalTariffRate: 0.18,
    delivery: {
      minDays: 5,
      maxDays: 8,
      method: {
        fr: "Transport routier regional",
        en: "Regional road transport",
        es: "Transporte regional por carretera",
        ar: "النقل البري الإقليمي",
        pt: "Transporte rodoviario regional",
      },
      coverageZone: {
        fr: "Senegal, Mali, Cote d'Ivoire, Ghana",
        en: "Senegal, Mali, Ivory Coast, Ghana",
        es: "Senegal, Mali, Costa de Marfil, Ghana",
        ar: "السنغال، مالي، ساحل العاج، غانا",
        pt: "Senegal, Mali, Costa do Marfim, Gana",
      },
    },
    supplierId: "sup-1",
    description: {
      fr: "Riz de qualité supérieure, cultivé sans pesticides.",
      en: "Premium quality rice, grown without pesticides.",
      es: "Arroz de calidad superior, cultivado sin pesticidas.",
      ar: "أرز عالي الجودة، يُزرع بدون مبيدات حشرية.",
      pt: "Arroz de qualidade superior, cultivado sem pesticidas.",
    },
  },
  {
    id: 2,
    name: {
      fr: "Tissu Kente du Ghana",
      en: "Ghanaian Kente Fabric",
      es: "Tela Kente de Ghana",
      ar: "قماش كينتي من غانا",
      pt: "Tecido Kente do Gana",
    },
    category: "textile",
    country: "gh",
    priceUsd: 25,
    rating: 5,
    minQty: 10,
    unit: {
      fr: "pièce",
      en: "piece",
      es: "pieza",
      ar: "قطعة",
      pt: "peça",
    },
    taxFree: true,
    imageUrl: "https://images.unsplash.com/photo-1772411535291-aa5884035934?w=400&h=280&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1772411535291-aa5884035934?w=900&h=620&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=900&h=620&fit=crop&auto=format",
    ],
    internationalTariffRate: 0.22,
    delivery: {
      minDays: 6,
      maxDays: 10,
      method: {
        fr: "Transporteur partenaire",
        en: "Partner carrier delivery",
        es: "Transportista asociado",
        ar: "شركة نقل شريكة",
        pt: "Transportadora parceira",
      },
      coverageZone: {
        fr: "Ghana, Nigeria, Senegal, Cote d'Ivoire",
        en: "Ghana, Nigeria, Senegal, Ivory Coast",
        es: "Ghana, Nigeria, Senegal, Costa de Marfil",
        ar: "غانا، نيجيريا، السنغال، ساحل العاج",
        pt: "Gana, Nigeria, Senegal, Costa do Marfim",
      },
    },
    supplierId: "sup-2",
    description: {
      fr: "Tissu traditionnel tissé à la main par des artisans qualifiés.",
      en: "Traditional fabric hand-woven by skilled artisans.",
      es: "Tela tradicional tejida a mano por artesanos calificados.",
      ar: "قماش تقليدي منسوج يدويًا بواسطة حرفيين مهرة.",
      pt: "Tecido tradicional tecido à mão por artesãos qualificados.",
    },
  },
  {
    id: 3,
    name: {
      fr: "Paniers tressés artisanaux",
      en: "Handwoven Artisan Baskets",
      es: "Cestas artesanales tejidas a mano",
      ar: "سلال حرفية منسوجة يدويًا",
      pt: "Cestas artesanais trançadas à mão",
    },
    category: "textile",
    country: "ke",
    priceUsd: 15,
    rating: 4.8,
    minQty: 5,
    unit: {
      fr: "pièce",
      en: "piece",
      es: "pieza",
      ar: "قطعة",
      pt: "peça",
    },
    taxFree: true,
    imageUrl: "https://images.unsplash.com/photo-1776409933876-022c6cb0baf6?w=400&h=280&fit=crop&auto=format",
    internationalTariffRate: 0.20,
    delivery: {
      minDays: 4,
      maxDays: 7,
      method: {
        fr: "Livraison par transporteur partenaire",
        en: "Partner carrier delivery",
        es: "Entrega por transportista asociado",
        ar: "توصيل عبر ناقل شريك",
        pt: "Entrega por transportadora parceira",
      },
      coverageZone: {
        fr: "Kenya, Ethiopie, Tanzanie, Ouganda",
        en: "Kenya, Ethiopia, Tanzania, Uganda",
        es: "Kenia, Etiopia, Tanzania, Uganda",
        ar: "كينيا، إثيوبيا، تنزانيا، أوغندا",
        pt: "Quenia, Etiopia, Tanzania, Uganda",
      },
    },
    supplierId: "sup-3",
    description: {
      fr: "Paniers 100% naturels, faits main par des artisanes.",
      en: "100% natural baskets, handmade by women artisans.",
      es: "Cestas 100% naturales, hechas a mano por artesanas.",
      ar: "سلال طبيعية 100٪، مصنوعة يدويًا بواسطة حرفيات.",
      pt: "Cestas 100% naturais, feitas à mão por artesãs.",
    },
  },
  {
    id: 4,
    name: {
      fr: "Babouches en cuir du Maroc",
      en: "Moroccan Leather Slippers",
      es: "Babuchas de cuero de Marruecos",
      ar: "بلغة جلدية من المغرب",
      pt: "Chinelos de couro marroquinos",
    },
    category: "textile",
    country: "ma",
    priceUsd: 18,
    rating: 4.7,
    minQty: 1,
    unit: {
      fr: "paire",
      en: "pair",
      es: "par",
      ar: "زوج",
      pt: "par",
    },
    taxFree: true,
    imageUrl: "https://images.unsplash.com/photo-1761416182630-9a5a974e3fca?w=400&h=280&fit=crop&auto=format",
    internationalTariffRate: 0.24,
    delivery: {
      minDays: 7,
      maxDays: 12,
      method: {
        fr: "Transport routier et maritime regional",
        en: "Regional road and sea transport",
        es: "Transporte regional terrestre y maritimo",
        ar: "نقل بري وبحري إقليمي",
        pt: "Transporte regional rodoviario e maritimo",
      },
      coverageZone: {
        fr: "Maroc, Algerie, Senegal, Cote d'Ivoire",
        en: "Morocco, Algeria, Senegal, Ivory Coast",
        es: "Marruecos, Argelia, Senegal, Costa de Marfil",
        ar: "المغرب، الجزائر، السنغال، ساحل العاج",
        pt: "Marrocos, Argelia, Senegal, Costa do Marfim",
      },
    },
    supplierId: "sup-4",
    description: {
      fr: "Cuir véritable tanné traditionnellement, teinture naturelle.",
      en: "Genuine leather traditionally tanned, natural dye.",
      es: "Cuero genuino curtido tradicionalmente, tinte natural.",
      ar: "جلد أصلي مدبوغ تقليديًا، صبغة طبيعية.",
      pt: "Couro genuíno curtido tradicionalmente, corante natural.",
    },
  },
  {
    id: 5,
    name: {
      fr: "Assiettes décoratives en céramique",
      en: "Decorative Ceramic Plates",
      es: "Platos decorativos de cerámica",
      ar: "أطباق خزفية زخرفية",
      pt: "Pratos decorativos de cerâmica",
    },
    category: "textile",
    country: "ma",
    priceUsd: 12,
    rating: 4.6,
    minQty: 6,
    unit: {
      fr: "pièce",
      en: "piece",
      es: "pieza",
      ar: "قطعة",
      pt: "peça",
    },
    taxFree: true,
    imageUrl: "https://images.unsplash.com/photo-1772411534854-e00e174b596d?w=400&h=280&fit=crop&auto=format",
    internationalTariffRate: 0.21,
    delivery: {
      minDays: 8,
      maxDays: 13,
      method: {
        fr: "Transporteur partenaire avec emballage protege",
        en: "Partner carrier with protected packaging",
        es: "Transportista asociado con embalaje protegido",
        ar: "ناقل شريك مع تغليف محمي",
        pt: "Transportadora parceira com embalagem protegida",
      },
      coverageZone: {
        fr: "Maroc, Algerie, Egypte, Senegal",
        en: "Morocco, Algeria, Egypt, Senegal",
        es: "Marruecos, Argelia, Egipto, Senegal",
        ar: "المغرب، الجزائر، مصر، السنغال",
        pt: "Marrocos, Argelia, Egito, Senegal",
      },
    },
    supplierId: "sup-5",
    description: {
      fr: "Céramique artisanale peinte à la main avec motifs berbères.",
      en: "Artisanal ceramic hand-painted with Berber patterns.",
      es: "Cerámica artesanal pintada a mano con patrones bereberes.",
      ar: "خزف حرفي مطلي يدويًا بأنماط أمازيغية.",
      pt: "Cerâmica artesanal pintada à mão com padrões berberes.",
    },
  },
  {
    id: 6,
    name: {
      fr: "Légumes frais de Lagos",
      en: "Fresh Vegetables from Lagos",
      es: "Verduras frescas de Lagos",
      ar: "خضروات طازجة من لاغوس",
      pt: "Vegetais frescos de Lagos",
    },
    category: "agriculture",
    country: "ng",
    priceUsd: 0.80,
    rating: 4.3,
    minQty: 50,
    unit: {
      fr: "kg",
      en: "kg",
      es: "kg",
      ar: "كجم",
      pt: "kg",
    },
    taxFree: true,
    imageUrl: "https://images.unsplash.com/photo-1777065851469-71aef898a26f?w=400&h=280&fit=crop&auto=format",
    internationalTariffRate: 0.15,
    delivery: {
      minDays: 2,
      maxDays: 5,
      method: {
        fr: "Transport frais regional",
        en: "Regional fresh goods transport",
        es: "Transporte regional para productos frescos",
        ar: "نقل إقليمي للمنتجات الطازجة",
        pt: "Transporte regional de frescos",
      },
      coverageZone: {
        fr: "Nigeria, Ghana, Benin, Togo",
        en: "Nigeria, Ghana, Benin, Togo",
        es: "Nigeria, Ghana, Benin, Togo",
        ar: "نيجيريا، غانا، بنين، توغو",
        pt: "Nigeria, Gana, Benin, Togo",
      },
    },
    supplierId: "sup-6",
    description: {
      fr: "Légumes frais cultivés localement, livrés rapidement.",
      en: "Fresh locally-grown vegetables, delivered quickly.",
      es: "Verduras frescas cultivadas localmente, entregadas rápidamente.",
      ar: "خضروات طازجة محلية، يتم تسليمها بسرعة.",
      pt: "Vegetais frescos cultivados localmente, entregues rapidamente.",
    },
  },
  {
    id: 7,
    name: {
      fr: "Café Yirgacheffe d'Éthiopie",
      en: "Ethiopian Yirgacheffe Coffee",
      es: "Café Yirgacheffe de Etiopía",
      ar: "قهوة يرغاتشيف الإثيوبية",
      pt: "Café Yirgacheffe da Etiópia",
    },
    category: "agriculture",
    country: "et",
    priceUsd: 8,
    rating: 5,
    minQty: 20,
    unit: {
      fr: "kg",
      en: "kg",
      es: "kg",
      ar: "كجم",
      pt: "kg",
    },
    taxFree: true,
    imageUrl: "https://images.unsplash.com/photo-1687422809617-a7d97879b3b0?w=400&h=280&fit=crop&auto=format",
    internationalTariffRate: 0.19,
    delivery: {
      minDays: 6,
      maxDays: 9,
      method: {
        fr: "Transporteur partenaire pour denrees seches",
        en: "Partner carrier for dry goods",
        es: "Transportista asociado para productos secos",
        ar: "ناقل شريك للسلع الجافة",
        pt: "Transportadora parceira para produtos secos",
      },
      coverageZone: {
        fr: "Ethiopie, Kenya, Egypte, Afrique du Sud",
        en: "Ethiopia, Kenya, Egypt, South Africa",
        es: "Etiopia, Kenia, Egipto, Sudafrica",
        ar: "إثيوبيا، كينيا، مصر، جنوب أفريقيا",
        pt: "Etiopia, Quenia, Egito, Africa do Sul",
      },
    },
    supplierId: "sup-7",
    description: {
      fr: "Café arabica premium, torréfaction artisanale sur place.",
      en: "Premium arabica coffee, artisanal roasting on-site.",
      es: "Café arábica premium, tostado artesanal en el lugar.",
      ar: "قهوة أرابيكا ممتازة، تحميص حرفي في الموقع.",
      pt: "Café arábica premium, torrefação artesanal no local.",
    },
  },
  {
    id: 8,
    name: {
      fr: "Tapis berbère en laine",
      en: "Berber Wool Rug",
      es: "Alfombra bereber de lana",
      ar: "سجادة أمازيغية من الصوف",
      pt: "Tapete berbere de lã",
    },
    category: "textile",
    country: "ma",
    priceUsd: 85,
    rating: 4.9,
    minQty: 1,
    unit: {
      fr: "pièce",
      en: "piece",
      es: "pieza",
      ar: "قطعة",
      pt: "peça",
    },
    taxFree: true,
    imageUrl: "https://images.unsplash.com/photo-1761828122942-e09382131eb1?w=400&h=280&fit=crop&auto=format",
    internationalTariffRate: 0.25,
    delivery: {
      minDays: 9,
      maxDays: 14,
      method: {
        fr: "Transporteur partenaire avec suivi colis",
        en: "Partner carrier with parcel tracking",
        es: "Transportista asociado con seguimiento",
        ar: "ناقل شريك مع تتبع الشحنة",
        pt: "Transportadora parceira com rastreio",
      },
      coverageZone: {
        fr: "Maroc, Algerie, Senegal, Afrique du Sud",
        en: "Morocco, Algeria, Senegal, South Africa",
        es: "Marruecos, Argelia, Senegal, Sudafrica",
        ar: "المغرب، الجزائر، السنغال، جنوب أفريقيا",
        pt: "Marrocos, Argelia, Senegal, Africa do Sul",
      },
    },
    supplierId: "sup-8",
    description: {
      fr: "Laine mérinos 100%, design traditionnel berbère transmis de génération en génération.",
      en: "100% merino wool, traditional Berber design passed down through generations.",
      es: "100% lana merino, diseño tradicional bereber transmitido de generación en generación.",
      ar: "100٪ صوف ميرينو، تصميم أمازيغي تقليدي متوارث عبر الأجيال.",
      pt: "100% lã merino, design tradicional berbere passado de geração em geração.",
    },
  },
];
