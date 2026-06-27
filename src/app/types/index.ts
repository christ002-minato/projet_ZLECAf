// ─── SHARED TYPES ────────────────────────────────────────────────────────────

export type Language = "fr" | "en" | "es" | "ar" | "pt";

export type LocalizedString = {
  fr: string;
  en: string;
  es: string;
  ar: string;
  pt: string;
};

export type SupplierType = "individual" | "representative" | "company";

export type CategoryId = "all" | "agriculture" | "textile" | "energie" | "construction" | "chimie";
