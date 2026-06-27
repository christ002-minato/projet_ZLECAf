import { COUNTRIES } from "../data/countries";

export function getBuyerCountry(countryId: string) {
  return COUNTRIES.find((country) => country.id === countryId) ?? COUNTRIES[0];
}

export function formatLocalPrice(priceUsd: number, countryId: string, language: string) {
  const country = getBuyerCountry(countryId);
  const locale = language === "ar" ? "ar-SA" : "fr-FR";
  const localValue = Math.round(priceUsd * country.rate);

  return {
    localValue,
    local: `${localValue.toLocaleString(locale)} ${country.currencySymbol}`,
    usd: `$${priceUsd.toFixed(2)}`,
  };
}
