import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { CheckCircle2, Lock, Phone } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ready">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    await login({ contact, password });
    setStatus("ready");
  };

  return (
    <div className="bg-background pb-20 md:pb-8">
      <section className="max-w-xl mx-auto px-4 py-10">
        <div className="mb-8">
          <p className="text-sm font-bold text-primary mb-2">Connexion</p>
          <h1 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "Outfit, sans-serif" }}>
            Se connecter a AfriMarket
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-5 md:p-6 shadow-sm">
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold">Telephone ou email</span>
              <span className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  required
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
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
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full bg-muted rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </span>
            </label>
          </div>

          {status === "ready" && (
            <div className="mt-5 flex items-center gap-2 rounded-lg bg-[#1E4D3B]/5 px-4 py-3 text-sm font-bold text-[#1E4D3B]">
              <CheckCircle2 className="w-5 h-5" />
              Votre compte est pret
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-6 w-full bg-primary text-white rounded-xl py-4 text-base md:text-lg font-black hover:bg-[#163d2e] transition-colors disabled:opacity-60"
          >
            {status === "loading" ? "Connexion en cours..." : "Se connecter"}
          </button>

          <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm font-bold">
            <button type="button" className="text-left text-primary hover:underline">
              Mot de passe oublie ?
            </button>
            <Link to="/register" className="text-primary hover:underline">
              Nouveau ? Creer un compte
            </Link>
          </div>

          {status === "ready" && (
            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-4 w-full border border-border rounded-xl py-3 text-sm font-bold hover:bg-muted transition-colors"
            >
              Retour a l'accueil
            </button>
          )}
        </form>
      </section>
    </div>
  );
}
