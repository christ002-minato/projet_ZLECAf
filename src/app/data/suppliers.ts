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
    name: "Moussa Diop",
    type: "company",
    countryId: "sn",
    city: "Kaolack",
    description: {
      fr: "Dirige une coopérative agricole produisant du riz biologique depuis 15 ans. Travaille avec plus de 200 agriculteurs locaux.",
      en: "Leads an agricultural cooperative producing organic rice for 15 years. Works with over 200 local farmers.",
      es: "Dirige una cooperativa agrícola que produce arroz orgánico desde hace 15 años. Trabaja con más de 200 agricultores locales.",
      ar: "يدير تعاونية زراعية تنتج الأرز العضوي منذ 15 عامًا. يعمل مع أكثر من 200 مزارع محلي.",
      pt: "Lidera uma cooperativa agrícola produzindo arroz orgânico há 15 anos. Trabalha com mais de 200 agricultores locais.",
    },
    imageUrl: "https://images.unsplash.com/photo-1773858437375-e49a91b73ff1?w=400&h=280&fit=crop&auto=format",
    verified: true,
    rating: 4.5,
    joinedDate: "2010-03-15",
    contactInfo: {
      phone: "+221 33 941 12 34",
      email: "moussa.diop@coop-kaolack.sn",
    },
  },
  {
    id: "sup-2",
    name: "Kofi Boateng",
    type: "company",
    countryId: "gh",
    city: "Accra",
    description: {
      fr: "Dirige un atelier de tissage traditionnel spécialisé dans le Kente authentique. Chaque pièce est tissée à la main par ses artisans qualifiés.",
      en: "Runs a traditional weaving workshop specializing in authentic Kente. Each piece is hand-woven by skilled artisans.",
      es: "Dirige un taller de tejido tradicional especializado en Kente auténtico. Cada pieza está tejida a mano por artesanos calificados.",
      ar: "يدير ورشة نسيج تقليدية متخصصة في كينتي الأصيل. كل قطعة منسوجة يدويًا من قبل حرفيين مهرة.",
      pt: "Dirige uma oficina de tecelagem tradicional especializada em Kente autêntico. Cada peça é tecida à mão por artesãos qualificados.",
    },
    imageUrl: "https://imgs.search.brave.com/5654DcTulvqG7yoN74JOdViQzw9gPxBrvcy1TgWiMxI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3RpL3Bob3Rv/cy1ncmF0dWl0ZS90/Mi82Njc4NDkxNC11/bmUtamV1bmUtbm9p/ci1ob21tZS1kYW5z/LXVuZS1ibGFuYy10/LWNoZW1pc2UtZ3Jh/dHVpdC1waG90by5q/cGc",
    verified: true,
    rating: 5.0,
    joinedDate: "2012-06-20",
    contactInfo: {
      phone: "+233 30 276 5432",
      email: "kofi.boateng@accraartisans.gh",
    },
  },
  {
    id: "sup-3",
    name: "Wanjiru Kamau",
    type: "representative",
    countryId: "ke",
    city: "Nairobi",
    description: {
      fr: "Représente un groupe de femmes artisanes créant des paniers tressés 100% naturels. Soutient l'autonomisation des femmes.",
      en: "Represents a group of women artisans creating 100% natural woven baskets. Supports women's empowerment.",
      es: "Representa a un grupo de mujeres artesanas que crean cestas tejidas 100% naturales. Apoya el empoderamiento de las mujeres.",
      ar: "تمثل مجموعة من النساء الحرفيات اللواتي يصنعن سلالًا منسوجة طبيعية 100٪. تدعم تمكين المرأة.",
      pt: "Representa um grupo de mulheres artesãs criando cestas trançadas 100% naturais. Apoia o empoderamento das mulheres.",
    },
    imageUrl: "https://imgs.search.brave.com/0KL8yKwkLhMz1rXTaSSfJT2xipK11ae2MRkMk6T0q6o/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly91cy4x/MjNyZi5jb20vNDUw/d20vcGVvcGxlaW1h/Z2VzMTIvcGVvcGxl/aW1hZ2VzMTIyMjEy/L3Blb3BsZWltYWdl/czEyMjIxMjA3OTY2/LzE5NTI5Njg3MS1m/ZW1tZS1ub2lyZS12/aXNhZ2UtZXQtc291/cmlyZS1hdmVjLXVu/LXR1cmJhbi1ldC11/bi1lc3BhY2UtbGli/cmUtcG91ci1sYS1j/dWx0dXJlLWFmcmlj/YWluZS1sZS5qcGc_/dmVyPTY",
    verified: true,
    rating: 4.8,
    joinedDate: "2015-01-10",
    contactInfo: {
      phone: "+254 20 234 5678",
      email: "wanjiru.kamau@nairobiartisans.ke",
    },
  },
  {
    id: "sup-4",
    name: "Hassan El Amrani",
    type: "company",
    countryId: "ma",
    city: "Fès",
    description: {
      fr: "Dirige un atelier familial de tannage traditionnel depuis 1920. Utilise uniquement des teintures naturelles et du cuir marocain de qualité.",
      en: "Runs a family tannery operating since 1920. Uses only natural dyes and quality Moroccan leather.",
      es: "Dirige una curtiduría familiar desde 1920. Utiliza únicamente tintes naturales y cuero marroquí de calidad.",
      ar: "يدير دباغة عائلية تقليدية منذ عام 1920. يستخدم فقط الأصباغ الطبيعية والجلد المغربي عالي الجودة.",
      pt: "Dirige um curtume familiar tradicional desde 1920. Usa apenas corantes naturais e couro marroquino de qualidade.",
    },
    imageUrl: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400&h=400&fit=crop&auto=format",
    verified: true,
    rating: 4.7,
    joinedDate: "2011-09-05",
    contactInfo: {
      phone: "+212 535 63 45 67",
      email: "hassan.elamrani@tanneurs-fes.ma",
    },
  },
  {
    id: "sup-5",
    name: "Fatima Zahra Idrissi",
    type: "representative",
    countryId: "ma",
    city: "Meknès",
    description: {
      fr: "Représente un collectif de 30 potiers traditionnels. Chaque assiette est peinte à la main avec des motifs berbères authentiques.",
      en: "Represents a collective of 30 traditional potters. Each plate is hand-painted with authentic Berber patterns.",
      es: "Representa a un colectivo de 30 alfareros tradicionales. Cada plato está pintado a mano con patrones bereberes auténticos.",
      ar: "تمثل مجموعة من 30 فخاريًا تقليديًا. كل طبق مطلي يدويًا بأنماط أمازيغية أصيلة.",
      pt: "Representa um coletivo de 30 oleiros tradicionais. Cada prato é pintado à mão com padrões berberes autênticos.",
    },
    imageUrl: "https://imgs.search.brave.com/fq-Amk7CyBriKnMlkKYCkcfUMjKzf4EsoszU953lge0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly91cy4x/MjNyZi5jb20vNDUw/d20vZG1iYWtlci9k/bWJha2VyMjEwOC9k/bWJha2VyMjEwODAw/MDIzLzE3MzEwODg2/Ny1mZW1tZS1hZnJp/Y2FpbmUtZC0lQzMl/QTJnZS1tb3llbi1m/ZW1tZS1lbi1hZnJp/cXVlLXBvcnRhbnQt/ZGVzLXYlQzMlQUF0/ZW1lbnRzLXRyYWRp/dGlvbm5lbHMtZXQt/dW4tbWFzcXVlLmpw/Zz92ZXI9Ng",
    verified: true,
    rating: 4.6,
    joinedDate: "2013-11-22",
    contactInfo: {
      phone: "+212 535 52 89 01",
      email: "fatima.idrissi@potiers-meknes.ma",
    },
  },
  {
    id: "sup-6",
    name: "Chinedu Okafor",
    type: "representative",
    countryId: "ng",
    city: "Lagos",
    description: {
      fr: "Représente un réseau de producteurs locaux de légumes frais. Livraison rapide dans toute la région de Lagos.",
      en: "Represents a network of local fresh vegetable producers. Fast delivery throughout the Lagos region.",
      es: "Representa una red de productores locales de verduras frescas. Entrega rápida en toda la región de Lagos.",
      ar: "يمثل شبكة من منتجي الخضروات الطازجة المحليين. توصيل سريع في جميع أنحاء منطقة لاغوس.",
      pt: "Representa uma rede de produtores locais de vegetais frescos. Entrega rápida em toda a região de Lagos.",
    },
    imageUrl: "https://imgs.search.brave.com/VZw0o9WxL-OL-5KbFBi3zKS3uuirDUGDn6_x2pkgRrA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3Bob3Rvcy1ncmF0/dWl0ZS9qZXVuZS1o/b21tZS1hZmZhaXJl/cy1hZnJpY2Fpbi1w/cm9zcGVyZS1wb3Nh/bnQtZGFucy1ub2ly/XzE3NjQyMC00OTY1/LmpwZz9nYT1HQTEu/MS4xMDIzMjgyMjQ0/LjE3Nzk4MzI3OTAm/c2VtdD1haXNfdGVz/dF9iJnc9NzQwJnE9/ODA",
    verified: false,
    rating: 4.3,
    joinedDate: "2018-04-12",
    contactInfo: {
      phone: "+234 1 234 5678",
      email: "chinedu.okafor@marche-lagos.ng",
    },
  },
  {
    id: "sup-7",
    name: "Abebe Bekele",
    type: "company",
    countryId: "et",
    city: "Harar",
    description: {
      fr: "Dirige une ferme caféière spécialisée dans l'arabica Yirgacheffe premium. Culture biologique et torréfaction artisanale sur place.",
      en: "Runs a coffee farm specializing in premium Yirgacheffe arabica. Organic cultivation and artisanal roasting on-site.",
      es: "Dirige una finca cafetera especializada en arábica Yirgacheffe premium. Cultivo orgánico y tostado artesanal en el lugar.",
      ar: "يدير مزرعة قهوة متخصصة في أرابيكا يرغاتشيف الممتازة. زراعة عضوية وتحميص حرفي في الموقع.",
      pt: "Dirige uma fazenda de café especializada em arábica Yirgacheffe premium. Cultivo orgânico e torrefação artesanal no local.",
    },
    imageUrl: "https://imgs.search.brave.com/bm1GRJ9G9kqIhtt-C6vz_XjBLx4JPaUua1ZGVIZsAfc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly91cy4x/MjNyZi5jb20vNDUw/d20vdnlzdGVrcGhv/dG9ncmFwaGllL3Z5/c3Rla3Bob3RvZ3Jh/cGhpZTIwMDUvdnlz/dGVrcGhvdG9ncmFw/aGllMjAwNTAwMDIw/LzE0NjA1OTgwNS1w/b3J0cmFpdC1kLXVu/ZS1mZW1tZS1hZnJp/Y2FpbmUtaGV1cmV1/c2UtZW4tdiVDMyVB/QXRlbWVudHMtdHJh/ZGl0aW9ubmVscy1k/ZWJvdXQtZGFucy1s/YS1uYXR1cmUtbW9u/dHJhbnQuanBnP3Zl/cj02",
    verified: true,
    rating: 5.0,
    joinedDate: "2009-02-18",
    contactInfo: {
      phone: "+251 25 666 1234",
      email: "abebe.bekele@harar-coffee.et",
    },
  },
  {
    id: "sup-8",
    name: "Amina Ait Ben Haddou",
    type: "company",
    countryId: "ma",
    city: "Marrakech",
    description: {
      fr: "Dirige une coopérative de femmes berbères tissant des tapis en laine mérinos. Designs traditionnels transmis de génération en génération.",
      en: "Leads a cooperative of Berber women weaving merino wool rugs. Traditional designs passed down through generations.",
      es: "Dirige una cooperativa de mujeres bereberes que tejen alfombras de lana merino. Diseños tradicionales transmitidos de generación en generación.",
      ar: "تدير تعاونية من النساء الأمازيغيات اللواتي ينسجن سجاد من صوف الميرينو. تصاميم تقليدية متوارثة عبر الأجيال.",
      pt: "Lidera uma cooperativa de mulheres berberes tecendo tapetes de lã merino. Desenhos tradicionais passados de geração em geração.",
    },
    imageUrl: "https://imgs.search.brave.com/LYT3CkphTDoWryfjoZvZ0gMrLo0rDlSbgJ7L04JI2Wk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ5/NDM3OTYxNy9mci9w/aG90by9iZWxsZXMt/ZmVtbWVzLWFyYWJl/cy1kdS1tb3llbi1v/cmllbnQtYXZlYy1h/YmF5YS10cmFkaXRp/b25uZWxsZS1lbi1z/dHVkaW8uanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPXU3bDk2/Vnl1cTRXZ3ZEa2tD/QXNSalJ3TUFPLXRy/ZV9ETzhVdkJhLUtn/Wlk9",
    verified: true,
    rating: 4.9,
    joinedDate: "2010-07-30",
    contactInfo: {
      phone: "+212 524 38 76 54",
      email: "amina.aitbenhaddou@atlas-weavers.ma",
    },
  },
  {
    id: "sup-9",
    name: "Koffi Koné",
    type: "individual",
    countryId: "ci",
    city: "Abidjan",
    description: {
      fr: "Producteur indépendant de cacao et de noix de cajou dans la région d'Abidjan. Vend directement aux acheteurs depuis sa propre exploitation.",
      en: "Independent cocoa and cashew nut producer in the Abidjan region. Sells directly to buyers from his own farm.",
      es: "Productor independiente de cacao y nueces de anacardo en la región de Abiyán. Vende directamente a los compradores desde su propia finca.",
      ar: "منتج مستقل للكاكاو وجوز الكاجو في منطقة أبيدجان. يبيع مباشرة للمشترين من مزرعته الخاصة.",
      pt: "Produtor independente de cacau e castanha de caju na região de Abidjan. Vende diretamente aos compradores de sua própria fazenda.",
    },
    imageUrl: "https://imgs.search.brave.com/-BAOiunzaimUhcMwycONfoYh9EsAhG8xiWX6SCeDTtc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi8lQzMl/QTljb3V0ZW50LTcw/OC0zMDgyNjAuanBn",
    verified: true,
    rating: 4.7,
    joinedDate: "2019-05-08",
    contactInfo: {
      phone: "+225 07 12 34 56 78",
      email: "koffi.kone@gmail.com",
    },
  },
];