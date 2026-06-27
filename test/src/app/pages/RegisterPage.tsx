import { FormEvent, useState } from "react";
import { Building2, CheckCircle2, Flag, Lock, MapPin, Phone, User, Users } from "lucide-react";
import { useNavigate } from "react-router";
import { COUNTRIES } from "../data/countries";
import { CATEGORIES } from "../data/categories";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage, t } from "../contexts/LanguageContext";
import type { ProfileType } from "../services/authApi";

const profileOptions: {
  value: ProfileType;
  label: string;
  Icon: typeof User;
}[] = [
  { value: "individual", label: "Particulier", Icon: User },
  { value: "representative", label: "Representant", Icon: Users },
  { value: "company", label: "Entreprise", Icon: Building2 },
];

const initialForm = {
  fullName: "",
  contact: "",
  password: "",
  country: "sn",
  city: "",
  companyName: "",
  sector: "",
  regNumber: "",
};

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { language } = useLanguage();
  const [profileType, setProfileType] = useState<ProfileType>("individual");
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "ready">("idle");

  const selectedCountry = COUNTRIES.find((country) => country.id === form.country) ?? COUNTRIES[0];
  const needsCompanyFields = profileType !== "individual";

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    await register({
      profileType,
      fullName: form.fullName,
      contact: form.contact,
      password: form.password,
      country: form.country,
      city: form.city,
      companyName: needsCompanyFields ? form.companyName : undefined,
      sector: needsCompanyFields ? form.sector : undefined,
      regNumber: needsCompanyFields ? form.regNumber : undefined,
    });

    setStatus("ready");
  };

  return (
    <div className="bg-background pb-20 md:pb-8">
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8">
          <p className="text-sm font-bold text-primary mb-2">Inscription gratuite</p>
          <h1 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "Outfit, sans-serif" }}>
            Creer votre compte AfriMarket
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {profileOptions.map(({ value, label, Icon }) => {
            const selected = profileType === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setProfileType(value)}
                className={`text-left border rounded-xl p-5 transition-all ${
                  selected
                    ? "border-primary bg-green-50 shadow-sm"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    selected ? "bg-primary text-white" : "bg-muted text-foreground"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="font-black text-lg">{label}</div>
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-5 md:p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold">Nom complet</span>
              <span className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  required
                  value={form.fullName}
                  onChange={(event) => updateField("fullName", event.target.value)}
                  className="w-full bg-muted rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </span>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold">Telephone ou email</span>
              <span className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  required
                  value={form.contact}
                  onChange={(event) => updateField("contact", event.target.value)}
                  className="w-full bg-muted rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </span>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold">Mot de passe</span>
              <span className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  required
                  minLength={6}
                  type="password"
                  value={form.password}
                  onChange={(event) => updateField("password", event.target.value)}
                  className="w-full bg-muted rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </span>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold">Pays</span>
              <span className="relative">
                <Flag
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: selectedCountry.color }}
                />
                <select
                  required
                  value={form.country}
                  onChange={(event) => updateField("country", event.target.value)}
                  className="w-full bg-muted rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                >
                  {COUNTRIES.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name[language]} ({country.code})
                    </option>
                  ))}
                </select>
              </span>
            </label>

            <label className="flex flex-col gap-2 md:col-span-2">
              <span className="text-sm font-bold">Ville</span>
              <span className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  required
                  value={form.city}
                  onChange={(event) => updateField("city", event.target.value)}
                  className="w-full bg-muted rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </span>
            </label>

            {needsCompanyFields && (
              <>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-bold">Nom de l'entreprise ou cooperative</span>
                  <span className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      required
                      value={form.companyName}
                      onChange={(event) => updateField("companyName", event.target.value)}
                      className="w-full bg-muted rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                    />
                  </span>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-bold">Secteur d'activite</span>
                  <select
                    required
                    value={form.sector}
                    onChange={(event) => updateField("sector", event.target.value)}
                    className="w-full bg-muted rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Choisir un secteur</option>
                    {CATEGORIES.filter((category) => category.id !== "all").map((category) => (
                      <option key={category.id} value={category.id}>
                        {t(category.id, language)}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2 md:col-span-2">
                  <span className="text-sm font-bold">Numero d'enregistrement si disponible</span>
                  <input
                    value={form.regNumber}
                    onChange={(event) => updateField("regNumber", event.target.value)}
                    className="w-full bg-muted rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                  />
                </label>
              </>
            )}
          </div>

          {status === "ready" && (
            <div className="mt-5 flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
              <CheckCircle2 className="w-5 h-5" />
              Votre compte est pret
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-6 w-full bg-primary text-white rounded-xl py-4 text-base md:text-lg font-black hover:bg-green-700 transition-colors disabled:opacity-60"
          >
            {status === "loading" ? "Creation en cours..." : "Creer mon compte gratuitement"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-4 w-full text-sm font-bold text-primary hover:underline"
          >
            J'ai deja un compte
          </button>
        </form>
      </section>
    </div>
  );
}
