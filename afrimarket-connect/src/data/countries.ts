export interface CountryConfig {
  id: string;
  nameFr: string;
  nameEn: string;
  flag: string;
  defaultLang: 'fr' | 'en' | 'ar' | 'es';
  colors: {
    primary: string;      // Header, main brand
    secondary: string;    // Secondary buttons, banners
    accent: string;       // Badges, highlights
    textOnPrimary: string; // Ensure readable text on primary color (usually white)
  };
}

export const COUNTRIES: CountryConfig[] = [
  {
    id: "senegal",
    nameFr: "Sénégal",
    nameEn: "Senegal",
    flag: "🇸🇳",
    defaultLang: "fr",
    colors: { primary: "#00853F", secondary: "#FDEF42", accent: "#E31B23", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "cote_divoire",
    nameFr: "Côte d'Ivoire",
    nameEn: "Côte d'Ivoire",
    flag: "🇨🇮",
    defaultLang: "fr",
    colors: { primary: "#FF8200", secondary: "#FFFFFF", accent: "#009A44", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "ghana",
    nameFr: "Ghana",
    nameEn: "Ghana",
    flag: "🇬🇭",
    defaultLang: "en",
    colors: { primary: "#CE1126", secondary: "#FCD116", accent: "#006B3F", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "nigeria",
    nameFr: "Nigeria",
    nameEn: "Nigeria",
    flag: "🇳🇬",
    defaultLang: "en",
    colors: { primary: "#008751", secondary: "#FFFFFF", accent: "#008751", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "kenya",
    nameFr: "Kenya",
    nameEn: "Kenya",
    flag: "🇰🇪",
    defaultLang: "en",
    colors: { primary: "#990000", secondary: "#000000", accent: "#006600", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "maroc",
    nameFr: "Maroc",
    nameEn: "Morocco",
    flag: "🇲🇦",
    defaultLang: "ar",
    colors: { primary: "#C1272D", secondary: "#006233", accent: "#006233", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "egypte",
    nameFr: "Égypte",
    nameEn: "Egypt",
    flag: "🇪🇬",
    defaultLang: "ar",
    colors: { primary: "#C09300", secondary: "#C1272D", accent: "#000000", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "ethiopie",
    nameFr: "Éthiopie",
    nameEn: "Ethiopia",
    flag: "🇪🇹",
    defaultLang: "en",
    colors: { primary: "#1F75FE", secondary: "#078930", accent: "#FCD116", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "afrique_du_sud",
    nameFr: "Afrique du Sud",
    nameEn: "South Africa",
    flag: "🇿🇦",
    defaultLang: "en",
    colors: { primary: "#007C3C", secondary: "#DE3831", accent: "#002395", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "algerie",
    nameFr: "Algérie",
    nameEn: "Algeria",
    flag: "🇩🇿",
    defaultLang: "ar",
    colors: { primary: "#006233", secondary: "#FFFFFF", accent: "#D21034", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "angola",
    nameFr: "Angola",
    nameEn: "Angola",
    flag: "🇦🇴",
    defaultLang: "fr", // Or pt, but user default mapping has it fallback. Let's map Ang to fr as fallback
    colors: { primary: "#DE3831", secondary: "#000000", accent: "#F9D616", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "benin",
    nameFr: "Bénin",
    nameEn: "Benin",
    flag: "🇧🇯",
    defaultLang: "fr",
    colors: { primary: "#008751", secondary: "#FCD116", accent: "#E8112D", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "botswana",
    nameFr: "Botswana",
    nameEn: "Botswana",
    flag: "🇧🇼",
    defaultLang: "en",
    colors: { primary: "#008CFF", secondary: "#000000", accent: "#FFFFFF", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "burkina_faso",
    nameFr: "Burkina Faso",
    nameEn: "Burkina Faso",
    flag: "🇧🇫",
    defaultLang: "fr",
    colors: { primary: "#EF2B2D", secondary: "#009E49", accent: "#FCD116", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "burundi",
    nameFr: "Burundi",
    nameEn: "Burundi",
    flag: "🇧🇮",
    defaultLang: "fr",
    colors: { primary: "#118B44", secondary: "#ED1C24", accent: "#FFFFFF", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "cameroun",
    nameFr: "Cameroun",
    nameEn: "Cameroon",
    flag: "🇨🇲",
    defaultLang: "fr",
    colors: { primary: "#007A5E", secondary: "#CE1126", accent: "#FCD116", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "cap_vert",
    nameFr: "Cap-Vert",
    nameEn: "Cabo Verde",
    flag: "🇨🇻",
    defaultLang: "en", // fallback
    colors: { primary: "#002F6C", secondary: "#FFFFFF", accent: "#C8102E", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "republique_centrafricaine",
    nameFr: "République Centrafricaine",
    nameEn: "Central African Republic",
    flag: "🇨🇫",
    defaultLang: "fr",
    colors: { primary: "#003087", secondary: "#009639", accent: "#FFCD00", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "tchad",
    nameFr: "Tchad",
    nameEn: "Chad",
    flag: "🇹🇩",
    defaultLang: "fr",
    colors: { primary: "#002664", secondary: "#FECB00", accent: "#C60C30", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "comores",
    nameFr: "Comores",
    nameEn: "Comoros",
    flag: "🇰🇲",
    defaultLang: "fr",
    colors: { primary: "#3A7D44", secondary: "#FFD100", accent: "#FFFFFF", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "congo",
    nameFr: "Congo (Brazzaville)",
    nameEn: "Congo (Brazzaville)",
    flag: "🇨🇬",
    defaultLang: "fr",
    colors: { primary: "#008751", secondary: "#FFD100", accent: "#DC241F", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "rd_congo",
    nameFr: "RD Congo",
    nameEn: "DR Congo",
    flag: "🇨🇩",
    defaultLang: "fr",
    colors: { primary: "#007FFF", secondary: "#FCE014", accent: "#CE102F", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "djibouti",
    nameFr: "Djibouti",
    nameEn: "Djibouti",
    flag: "🇩🇯",
    defaultLang: "ar",
    colors: { primary: "#4189DD", secondary: "#12AD2B", accent: "#E20F17", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "guinee_equatoriale",
    nameFr: "Guinée équatoriale",
    nameEn: "Equatorial Guinea",
    flag: "🇬🇶",
    defaultLang: "es",
    colors: { primary: "#319400", secondary: "#E20F17", accent: "#003087", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "erythree",
    nameFr: "Érythrée",
    nameEn: "Eritrea",
    flag: "🇪🇷",
    defaultLang: "en",
    colors: { primary: "#00A651", secondary: "#007A87", accent: "#ED1C24", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "eswatini",
    nameFr: "Eswatini",
    nameEn: "Eswatini",
    flag: "🇸🇿",
    defaultLang: "en",
    colors: { primary: "#3E5EB9", secondary: "#B11F24", accent: "#F8D115", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "gabon",
    nameFr: "Gabon",
    nameEn: "Gabon",
    flag: "🇬🇦",
    defaultLang: "fr",
    colors: { primary: "#009E49", secondary: "#FCD116", accent: "#3A75C4", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "gambie",
    nameFr: "Gambie",
    nameEn: "Gambia",
    flag: "🇬🇲",
    defaultLang: "en",
    colors: { primary: "#E41C2B", secondary: "#0C1C8C", accent: "#3A7D44", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "guinee",
    nameFr: "Guinée",
    nameEn: "Guinea",
    flag: "🇬🇳",
    defaultLang: "fr",
    colors: { primary: "#CE1126", secondary: "#FCD116", accent: "#009460", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "guinee_bissau",
    nameFr: "Guinée-Bissau",
    nameEn: "Guinea-Bissau",
    flag: "🇬🇼",
    defaultLang: "fr",
    colors: { primary: "#CE1126", secondary: "#FCD116", accent: "#009E49", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "lesotho",
    nameFr: "Lesotho",
    nameEn: "Lesotho",
    flag: "🇱🇸",
    defaultLang: "en",
    colors: { primary: "#00209F", secondary: "#FFFFFF", accent: "#009543", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "liberia",
    nameFr: "Liberia",
    nameEn: "Liberia",
    flag: "🇱🇷",
    defaultLang: "en",
    colors: { primary: "#11224D", secondary: "#FFFFFF", accent: "#B11F24", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "libye",
    nameFr: "Libye",
    nameEn: "Libya",
    flag: "🇱🇾",
    defaultLang: "ar",
    colors: { primary: "#000000", secondary: "#239E46", accent: "#E20F17", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "madagascar",
    nameFr: "Madagascar",
    nameEn: "Madagascar",
    flag: "🇲🇬",
    defaultLang: "fr",
    colors: { primary: "#FC3D32", secondary: "#FFFFFF", accent: "#007E3A", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "malawi",
    nameFr: "Malawi",
    nameEn: "Malawi",
    flag: "🇲🇼",
    defaultLang: "en",
    colors: { primary: "#D91626", secondary: "#000000", accent: "#239E46", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "mali",
    nameFr: "Mali",
    nameEn: "Mali",
    flag: "🇲🇱",
    defaultLang: "fr",
    colors: { primary: "#14B53A", secondary: "#FFD100", accent: "#E20F17", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "mauritanie",
    nameFr: "Mauritanie",
    nameEn: "Mauritania",
    flag: "🇲🇷",
    defaultLang: "ar",
    colors: { primary: "#006233", secondary: "#FFD100", accent: "#E20F17", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "maurice",
    nameFr: "Maurice",
    nameEn: "Mauritius",
    flag: "🇲🇺",
    defaultLang: "en",
    colors: { primary: "#EA2426", secondary: "#1A2063", accent: "#00A04A", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "mozambique",
    nameFr: "Mozambique",
    nameEn: "Mozambique",
    flag: "🇲🇿",
    defaultLang: "en", // fallback
    colors: { primary: "#007A5E", secondary: "#000000", accent: "#D21034", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "namibie",
    nameFr: "Namibie",
    nameEn: "Namibia",
    flag: "🇳🇦",
    defaultLang: "en",
    colors: { primary: "#002F6C", secondary: "#CD102D", accent: "#007A5E", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "niger",
    nameFr: "Niger",
    nameEn: "Niger",
    flag: "🇳🇪",
    defaultLang: "fr",
    colors: { primary: "#E05206", secondary: "#FFFFFF", accent: "#0DB02B", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "rwanda",
    nameFr: "Rwanda",
    nameEn: "Rwanda",
    flag: "🇷🇼",
    defaultLang: "fr",
    colors: { primary: "#00A1DE", secondary: "#EAD151", accent: "#20603D", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "sao_tome",
    nameFr: "Sao Tomé-et-Principe",
    nameEn: "São Tomé and Príncipe",
    flag: "🇸🇹",
    defaultLang: "fr", // fallback
    colors: { primary: "#12AD2B", secondary: "#FFD100", accent: "#D21034", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "seychelles",
    nameFr: "Seychelles",
    nameEn: "Seychelles",
    flag: "🇸🇨",
    defaultLang: "en",
    colors: { primary: "#002F6C", secondary: "#FCD116", accent: "#D11919", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "sierra_leone",
    nameFr: "Sierra Leone",
    nameEn: "Sierra Leone",
    flag: "🇸🇱",
    defaultLang: "en",
    colors: { primary: "#1EB53A", secondary: "#FFFFFF", accent: "#0072C6", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "somalie",
    nameFr: "Somalie",
    nameEn: "Somalia",
    flag: "🇸🇴",
    defaultLang: "ar",
    colors: { primary: "#4189DD", secondary: "#FFFFFF", accent: "#4189DD", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "soudan",
    nameFr: "Soudan",
    nameEn: "Sudan",
    flag: "🇸🇩",
    defaultLang: "ar",
    colors: { primary: "#CE1126", secondary: "#FFFFFF", accent: "#007229", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "soudan_du_sud",
    nameFr: "Soudan du Sud",
    nameEn: "South Sudan",
    flag: "🇸🇸",
    defaultLang: "en",
    colors: { primary: "#000000", secondary: "#CE1126", accent: "#078930", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "tanzanie",
    nameFr: "Tanzanie",
    nameEn: "Tanzania",
    flag: "🇹🇿",
    defaultLang: "en",
    colors: { primary: "#1EB53A", secondary: "#FCD116", accent: "#00A3DD", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "togo",
    nameFr: "Togo",
    nameEn: "Togo",
    flag: "🇹🇬",
    defaultLang: "fr",
    colors: { primary: "#006A4E", secondary: "#FFD100", accent: "#D11919", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "tunisie",
    nameFr: "Tunisie",
    nameEn: "Tunisia",
    flag: "🇹🇳",
    defaultLang: "ar",
    colors: { primary: "#E20F17", secondary: "#FFFFFF", accent: "#E20F17", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "ouganda",
    nameFr: "Ouganda",
    nameEn: "Uganda",
    flag: "🇺🇬",
    defaultLang: "en",
    colors: { primary: "#000000", secondary: "#FCD116", accent: "#D91426", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "zambie",
    nameFr: "Zambie",
    nameEn: "Zambia",
    flag: "🇿🇲",
    defaultLang: "en",
    colors: { primary: "#198A00", secondary: "#DE3831", accent: "#FF9E1B", textOnPrimary: "#FFFFFF" }
  },
  {
    id: "zimbabwe",
    nameFr: "Zimbabwe",
    nameEn: "Zimbabwe",
    flag: "🇿🇼",
    defaultLang: "en",
    colors: { primary: "#319400", secondary: "#FFD100", accent: "#DE3831", textOnPrimary: "#FFFFFF" }
  }
];

export function getCountryThemeCSS(countryId: string): string {
  const country = COUNTRIES.find(c => c.id === countryId) || COUNTRIES[0];
  return `
    :root {
      --color-primary: ${country.colors.primary};
      --color-secondary: ${country.colors.secondary};
      --color-accent: ${country.colors.accent};
      --color-text-on-primary: ${country.colors.textOnPrimary};
    }
  `;
}
