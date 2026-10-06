"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

type AuthFormProps = {
  mode: "login" | "signup";
};

const firebaseErrorMessages: Record<string, string> = {
  "auth/email-already-in-use": "Cette adresse e-mail est déjà associée à un compte.",
  "auth/invalid-credential": "Adresse e-mail ou mot de passe incorrect.",
  "auth/invalid-email": "L’adresse e-mail n’est pas valide.",
  "auth/weak-password": "Le mot de passe doit contenir au moins 6 caractères.",
  "auth/too-many-requests": "Trop de tentatives. Réessayez dans quelques instants.",
  "auth/network-request-failed": "Connexion impossible. Vérifiez votre réseau.",
};

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const isSignup = mode === "signup";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (isSignup) {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(credential.user, { displayName: name.trim() });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      router.replace("/dashboard");
    } catch (caughtError) {
      const code = (caughtError as { code?: string }).code;
      setError(firebaseErrorMessages[code ?? ""] ?? "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-shell">
      <aside className="auth-story" aria-label="Présentation d’Atelier">
        <div className="brand-name">
          <span className="brand-mark" aria-hidden="true">A</span>
          <span>Atelier</span>
        </div>
        <div className="story-copy">
          <span className="eyebrow">Votre espace de travail</span>
          <h1>Le travail d’équipe, à votre façon.</h1>
          <p>Retrouvez vos équipes et vos projets dans un espace pensé pour avancer ensemble.</p>
        </div>
        <div className="story-footer">Un espace. Toutes vos équipes.</div>
      </aside>

      <section className="auth-panel">
        <div className="auth-form-wrap">
          <div className="mobile-brand brand-name">
            <span className="brand-mark" aria-hidden="true">A</span>
            <span>Atelier</span>
          </div>
          <span className="eyebrow">{isSignup ? "Commencer" : "Bon retour"}</span>
          <h2 className="auth-heading">{isSignup ? "Créer votre compte" : "Connectez-vous"}</h2>
          <p className="auth-subheading">
            {isSignup
              ? "Créez votre accès pour découvrir votre espace de travail."
              : "Saisissez vos identifiants pour retrouver votre espace."}
          </p>

          <form className="auth-fields" onSubmit={handleSubmit}>
            {isSignup && (
              <label className="field-label">
                Nom complet
                <input
                  autoComplete="name"
                  className="field-input"
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Votre nom"
                  required
                  value={name}
                />
              </label>
            )}
            <label className="field-label">
              Adresse e-mail
              <input
                autoComplete="email"
                className="field-input"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="vous@exemple.com"
                required
                type="email"
                value={email}
              />
            </label>
            <label className="field-label">
              Mot de passe
              <input
                autoComplete={isSignup ? "new-password" : "current-password"}
                className="field-input"
                minLength={6}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={isSignup ? "6 caractères minimum" : "Votre mot de passe"}
                required
                type="password"
                value={password}
              />
            </label>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="primary-button" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Veuillez patienter…" : isSignup ? "Créer mon compte" : "Se connecter"}
            </button>
          </form>

          <p className="auth-switch">
            {isSignup ? "Vous avez déjà un compte ? " : "Pas encore de compte ? "}
            <Link href={isSignup ? "/login" : "/signup"}>
              {isSignup ? "Se connecter" : "Créer un compte"}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}