// ─── COUNTRIES DATA ──────────────────────────────────────────────────────────

export interface Country {
  id: string;
  name: {
    fr: string;
    en: string;
    es: string;
    ar: string;
    pt: string;
  };
  code: string;
  currencyCode: string;
  currencySymbol: string;
  rate: number;
  color: string;
  defaultLanguage: "fr" | "en" | "es" | "ar" | "pt";
}

export const COUNTRIES: Country[] = [
  {
    id: "sn",
    name: {
      fr: "Sénégal",
      en: "Senegal",
      es: "Senegal",
      ar: "السنغال",
      pt: "Senegal",
    },
    code: "SN",
    currencyCode: "XOF",
    currencySymbol: "FCFA",
    rate: 615,
    color: "#00853F",
    defaultLanguage: "fr",
  },
  {
    id: "ng",
    name: {
      fr: "Nigeria",
      en: "Nigeria",
      es: "Nigeria",
      ar: "نيجيريا",
      pt: "Nigéria",
    },
    code: "NG",
    currencyCode: "NGN",
    currencySymbol: "₦",
    rate: 1580,
    color: "#008751",
    defaultLanguage: "en",
  },
  {
    id: "gh",
    name: {
      fr: "Ghana",
      en: "Ghana",
      es: "Ghana",
      ar: "غانا",
      pt: "Gana",
    },
    code: "GH",
    currencyCode: "GHS",
    currencySymbol: "GH₵",
    rate: 14.5,
    color: "#006B3F",
    defaultLanguage: "en",
  },
  {
    id: "ke",
    name: {
      fr: "Kenya",
      en: "Kenya",
      es: "Kenia",
      ar: "كينيا",
      pt: "Quênia",
    },
    code: "KE",
    currencyCode: "KES",
    currencySymbol: "KSh",
    rate: 130,
    color: "#006600",
    defaultLanguage: "en",
  },
  {
    id: "ma",
    name: {
      fr: "Maroc",
      en: "Morocco",
      es: "Marruecos",
      ar: "المغرب",
      pt: "Marrocos",
    },
    code: "MA",
    currencyCode: "MAD",
    currencySymbol: "DH",
    rate: 10,
    color: "#C1272D",
    defaultLanguage: "ar",
  },
  {
    id: "za",
    name: {
      fr: "Afrique du Sud",
      en: "South Africa",
      es: "Sudáfrica",
      ar: "جنوب أفريقيا",
      pt: "África do Sul",
    },
    code: "ZA",
    currencyCode: "ZAR",
    currencySymbol: "R",
    rate: 18.5,
    color: "#007A4D",
    defaultLanguage: "en",
  },
  {
    id: "et",
    name: {
      fr: "Éthiopie",
      en: "Ethiopia",
      es: "Etiopía",
      ar: "إثيوبيا",
      pt: "Etiópia",
    },
    code: "ET",
    currencyCode: "ETB",
    currencySymbol: "Br",
    rate: 57,
    color: "#078930",
    defaultLanguage: "en",
  },
  {
    id: "ci",
    name: {
      fr: "Côte d'Ivoire",
      en: "Ivory Coast",
      es: "Costa de Marfil",
      ar: "ساحل العاج",
      pt: "Costa do Marfim",
    },
    code: "CI",
    currencyCode: "XOF",
    currencySymbol: "FCFA",
    rate: 615,
    color: "#F77F00",
    defaultLanguage: "fr",
  },
  {
    id: "dz",
    name: {
      fr: "Algérie",
      en: "Algeria",
      es: "Argelia",
      ar: "الجزائر",
      pt: "Argélia",
    },
    code: "DZ",
    currencyCode: "DZD",
    currencySymbol: "DA",
    rate: 135,
    color: "#006233",
    defaultLanguage: "ar",
  },
  {
    id: "eg",
    name: {
      fr: "Égypte",
      en: "Egypt",
      es: "Egipto",
      ar: "مصر",
      pt: "Egito",
    },
    code: "EG",
    currencyCode: "EGP",
    currencySymbol: "E£",
    rate: 50,
    color: "#CE1126",
    defaultLanguage: "ar",
  },
  {
    id: "ml",
    name: {
      fr: "Mali",
      en: "Mali",
      es: "Malí",
      ar: "مالي",
      pt: "Mali",
    },
    code: "ML",
    currencyCode: "XOF",
    currencySymbol: "FCFA",
    rate: 615,
    color: "#14B53A",
    defaultLanguage: "fr",
  },
];
