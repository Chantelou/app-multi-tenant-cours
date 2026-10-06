"use client";

import { onAuthStateChanged, signOut, User } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebaseConfig";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.replace("/login");
      } else {
        setUser(currentUser);
      }
      setIsCheckingSession(false);
    });
  }, [router]);

  async function handleSignOut() {
    await signOut(auth);
    router.replace("/login");
  }

  if (isCheckingSession || !user) {
    return <main className="dashboard-loading">Vérification de votre session…</main>;
  }

  return (
    <div className="dashboard-shell">
      <header className="dashboard-nav">
        <Link aria-label="Atelier, accueil" className="brand-name" href="/dashboard">
          <span className="brand-mark" aria-hidden="true">A</span>
          <span>Atelier</span>
        </Link>
        <div className="dashboard-account">
          <span className="account-email">{user.email}</span>
          <button className="text-button" onClick={handleSignOut} type="button">
            Se déconnecter
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-title-row">
          <div>
            <span className="eyebrow">Espace personnel</span>
            <h1>Bonjour{user.displayName ? `, ${user.displayName.split(" ")[0]}` : ""}.</h1>
            <p>Votre compte est prêt. La session Firebase est active.</p>
          </div>
          <span className="session-state">Connecté</span>
        </div>

        <section aria-labelledby="session-heading" className="session-panel">
          <div>
            <h2 id="session-heading">Authentification Firebase</h2>
            <p>La création de compte, la connexion et la persistance de session sont opérationnelles.</p>
          </div>
          <span className="eyebrow">Compte vérifié</span>
        </section>

        <section aria-label="Informations du compte" className="account-details">
          <div className="account-detail">
            <span>Nom affiché</span>
            <strong>{user.displayName || "Non renseigné"}</strong>
          </div>
          <div className="account-detail">
            <span>Adresse e-mail</span>
            <strong>{user.email || "Non renseignée"}</strong>
          </div>
          <div className="account-detail">
            <span>Identifiant Firebase</span>
            <strong>{user.uid}</strong>
          </div>
          <div className="account-detail">
            <span>Fournisseur</span>
            <strong>{user.providerData[0]?.providerId || "Firebase Auth"}</strong>
          </div>
        </section>
      </main>
    </div>
  );
}
