// ─── FORMAT UTILITIES ────────────────────────────────────────────────────────

import { COUNTRIES } from "../data/countries";

/**
 * Format a price in local currency and USD
 */
export function formatPrice(priceUsd: number, countryId: string, locale: string = "fr-FR") {
  const country = COUNTRIES.find((c) => c.id === countryId) ?? COUNTRIES[0];
  const local = Math.round(priceUsd * country.rate).toLocaleString(
    locale === "ar" ? "ar-SA" : locale
  );
  
  return {
    local: `${local} ${country.currencySymbol}`,
    usd: `$${priceUsd.toFixed(2)}`,
    country,
  };
}

/**
 * Format a date in a localized way
 */
export function formatDate(dateString: string, language: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  
  return year.toString();
}

/**
 * Get country by ID
 */
export function getCountryById(countryId: string) {
  return COUNTRIES.find((c) => c.id === countryId);
}
