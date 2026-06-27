import { Languages } from "lucide-react";
import { useLanguage, type Language } from "../contexts/LanguageContext";

const LANGUAGES: { code: Language; label: string }[] = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "ar", label: "العربية" },
  { code: "pt", label: "Português" },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative">
      <div className="flex items-center gap-1 bg-muted rounded-lg px-2 py-1.5">
        <Languages className="w-3.5 h-3.5 text-muted-foreground" />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="bg-transparent text-xs font-semibold text-foreground border-none outline-none cursor-pointer pr-4"
          aria-label="Sélectionner la langue"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}