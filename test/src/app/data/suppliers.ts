// ─── SUPPLIERS DATA ──────────────────────────────────────────────────────────

export interface Supplier {
  id: string;
  name: string;
  type: "individual" | "representative" | "company";
  countryId: string;
  city: string;
  description: {
    fr: string;
    en: string;
    es: string;
    ar: string;
    pt: string;
  };
  imageUrl: string;
  verified: boolean;
  rating: number;
  joinedDate: string;
  contactInfo: {
    phone?: string;
    email?: string;
  };
}

export const SUPPLIERS: Supplier[] = [
  {
    id: "sup-1",
    name: "Coopérative Kaolack",
    type: "company",
    countryId: "sn",
    city: "Kaolack",
    description: {
      fr: "Coopérative agricole produisant du riz biologique depuis 15 ans. Nous travaillons avec plus de 200 agriculteurs locaux.",
      en: "Agricultural cooperative producing organic rice for 15 years. We work with over 200 local farmers.",
      es: "Cooperativa agrícola que produce arroz orgánico desde hace 15 años. Trabajamos con más de 200 agricultores locales.",
      ar: "تعاونية زراعية تنتج الأرز العضوي منذ 15 عامًا. نعمل مع أكثر من 200 مزارع محلي.",
      pt: "Cooperativa agrícola produzindo arroz orgânico há 15 anos. Trabalhamos com mais de 200 agricultores locais.",
    },
    imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop&auto=format",
    verified: true,
    rating: 4.5,
    joinedDate: "2010-03-15",
    contactInfo: {
      phone: "+221 33 941 12 34",
      email: "contact@coop-kaolack.sn",
    },
  },
  {
    id: "sup-2",
    name: "Artisans d'Accra",
    type: "company",
    countryId: "gh",
    city: "Accra",
    description: {
      fr: "Atelier de tissage traditionnel spécialisé dans le Kente authentique. Chaque pièce est tissée à la main par nos artisans qualifiés.",
      en: "Traditional weaving workshop specializing in authentic Kente. Each piece is hand-woven by our skilled artisans.",
      es: "Taller de tejido tradicional especializado en Kente auténtico. Cada pieza está tejida a mano por nuestros artesanos calificados.",
      ar: "ورشة نسيج تقليدية متخصصة في كينتي الأصيل. كل قطعة منسوجة يدويًا من قبل حرفيينا المهرة.",
      pt: "Oficina de tecelagem tradicional especializada em Kente autêntico. Cada peça é tecida à mão por nossos artesãos qualificados.",
    },
    imageUrl: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc60a?w=400&h=400&fit=crop&auto=format",
    verified: true,
    rating: 5.0,
    joinedDate: "2012-06-20",
    contactInfo: {
      phone: "+233 30 276 5432",
      email: "info@accraartisans.gh",
    },
  },
  {
    id: "sup-3",
    name: "Artisanes de Nairobi",
    type: "company",
    countryId: "ke",
    city: "Nairobi",
    description: {
      fr: "Groupe de femmes artisanes créant des paniers tressés 100% naturels. Nous soutenons l'autonomisation des femmes.",
      en: "Group of women artisans creating 100% natural woven baskets. We support women's empowerment.",
      es: "Grupo de mujeres artesanas que crean cestas tejidas 100% naturales. Apoyamos el empoderamiento de las mujeres.",
      ar: "مجموعة من النساء الحرفيات اللواتي يصنعن سلالًا منسوجة طبيعية 100٪. ندعم تمكين المرأة.",
      pt: "Grupo de mulheres artesãs criando cestas trançadas 100% naturais. Apoiamos o empoderamento das mulheres.",
    },
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&auto=format",
    verified: true,
    rating: 4.8,
    joinedDate: "2015-01-10",
    contactInfo: {
      phone: "+254 20 234 5678",
      email: "hello@nairobiartisans.ke",
    },
  },
  {
    id: "sup-4",
    name: "Tanneurs de Fès",
    type: "company",
    countryId: "ma",
    city: "Fès",
    description: {
      fr: "Atelier familial de tannage traditionnel depuis 1920. Nous utilisons uniquement des teintures naturelles et du cuir marocain de qualité.",
      en: "Family-run traditional tannery since 1920. We use only natural dyes and quality Moroccan leather.",
      es: "Curtiduría tradicional familiar desde 1920. Utilizamos únicamente tintes naturales y cuero marroquí de calidad.",
      ar: "دباغة تقليدية عائلية منذ عام 1920. نستخدم فقط الأصباغ الطبيعية والجلد المغربي عالي الجودة.",
      pt: "Curtume tradicional familiar desde 1920. Usamos apenas corantes naturais e couro marroquino de qualidade.",
    },
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=400&fit=crop&auto=format",
    verified: true,
    rating: 4.7,
    joinedDate: "2011-09-05",
    contactInfo: {
      phone: "+212 535 63 45 67",
      email: "contact@tanneurs-fes.ma",
    },
  },
  {
    id: "sup-5",
    name: "Potiers de Meknès",
    type: "representative",
    countryId: "ma",
    city: "Meknès",
    description: {
      fr: "Représentant un collectif de 30 potiers traditionnels. Chaque assiette est peinte à la main avec des motifs berbères authentiques.",
      en: "Representing a collective of 30 traditional potters. Each plate is hand-painted with authentic Berber patterns.",
      es: "Representando un colectivo de 30 alfareros tradicionales. Cada plato está pintado a mano con patrones bereberes auténticos.",
      ar: "يمثل مجموعة من 30 فخاريًا تقليديًا. كل طبق مطلي يدويًا بأنماط أمازيغية أصيلة.",
      pt: "Representando um coletivo de 30 oleiros tradicionais. Cada prato é pintado à mão com padrões berberes autênticos.",
    },
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&auto=format",
    verified: true,
    rating: 4.6,
    joinedDate: "2013-11-22",
    contactInfo: {
      phone: "+212 535 52 89 01",
      email: "potiers@meknes.ma",
    },
  },
  {
    id: "sup-6",
    name: "Marché de Lagos",
    type: "representative",
    countryId: "ng",
    city: "Lagos",
    description: {
      fr: "Réseau de producteurs locaux de légumes frais. Livraison rapide dans toute la région de Lagos.",
      en: "Network of local fresh vegetable producers. Fast delivery throughout the Lagos region.",
      es: "Red de productores locales de verduras frescas. Entrega rápida en toda la región de Lagos.",
      ar: "شبكة من منتجي الخضروات الطازجة المحليين. توصيل سريع في جميع أنحاء منطقة لاغوس.",
      pt: "Rede de produtores locais de vegetais frescos. Entrega rápida em toda a região de Lagos.",
    },
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop&auto=format",
    verified: false,
    rating: 4.3,
    joinedDate: "2018-04-12",
    contactInfo: {
      phone: "+234 1 234 5678",
      email: "market@lagos.ng",
    },
  },
  {
    id: "sup-7",
    name: "Ferme Harar",
    type: "company",
    countryId: "et",
    city: "Harar",
    description: {
      fr: "Ferme caféière spécialisée dans l'arabica Yirgacheffe premium. Culture biologique et torréfaction artisanale sur place.",
      en: "Coffee farm specializing in premium Yirgacheffe arabica. Organic cultivation and artisanal roasting on-site.",
      es: "Finca cafetera especializada en arábica Yirgacheffe premium. Cultivo orgánico y tostado artesanal en el lugar.",
      ar: "مزرعة قهوة متخصصة في أرابيكا يرغاتشيف الممتازة. زراعة عضوية وتحميص حرفي في الموقع.",
      pt: "Fazenda de café especializada em arábica Yirgacheffe premium. Cultivo orgânico e torrefação artesanal no local.",
    },
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&auto=format",
    verified: true,
    rating: 5.0,
    joinedDate: "2009-02-18",
    contactInfo: {
      phone: "+251 25 666 1234",
      email: "info@harar-coffee.et",
    },
  },
  {
    id: "sup-8",
    name: "Tisseuses de l'Atlas",
    type: "company",
    countryId: "ma",
    city: "Marrakech",
    description: {
      fr: "Coopérative de femmes berbères tissant des tapis en laine mérinos. Designs traditionnels transmis de génération en génération.",
      en: "Cooperative of Berber women weaving merino wool rugs. Traditional designs passed down through generations.",
      es: "Cooperativa de mujeres bereberes que tejen alfombras de lana merino. Diseños tradicionales transmitidos de generación en generación.",
      ar: "تعاونية من النساء الأمازيغيات اللواتي ينسجن سجاد من صوف الميرينو. تصاميم تقليدية متوارثة عبر الأجيال.",
      pt: "Cooperativa de mulheres berberes tecendo tapetes de lã merino. Desenhos tradicionais passados de geração em geração.",
    },
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&auto=format",
    verified: true,
    rating: 4.9,
    joinedDate: "2010-07-30",
    contactInfo: {
      phone: "+212 524 38 76 54",
      email: "atlas.weavers@marrakech.ma",
    },
  },
];
