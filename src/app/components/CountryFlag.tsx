import { Flag } from "lucide-react";
import { COUNTRIES } from "../data/countries";

interface CountryFlagProps {
  countryId: string;
  className?: string;
  showName?: boolean;
}

/**
 * Displays a country flag icon (using color coding instead of emojis)
 */
export function CountryFlag({ countryId, className = "w-4 h-4", showName = false }: CountryFlagProps) {
  const country = COUNTRIES.find((c) => c.id === countryId);
  
  if (!country) return null;

  return (
    <div className="inline-flex items-center gap-1">
      <Flag 
        className={className} 
        style={{ color: country.color }}
        aria-label={`Drapeau ${country.code}`}
      />
      {showName && (
        <span className="font-semibold text-xs" style={{ color: country.color }}>
          {country.code}
        </span>
      )}
    </div>
  );
}
