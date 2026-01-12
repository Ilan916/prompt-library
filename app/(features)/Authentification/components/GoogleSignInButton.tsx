"use client";

import { useState } from "react";
import { signInWithGooglePopup } from "../services/auth-client";

export default function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGooglePopup();
      // after successful auth, reload or redirect as needed
      window.location.href = "/";
    } catch (e: any) {
      setError(e?.message || "Erreur lors de la connexion Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button onClick={handleClick} disabled={loading} className="w-full flex items-center justify-center gap-2 bg-white text-black p-2 rounded">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.3c0-.8-.1-1.6-.3-2.3H12v4.3h5.4c-.2 1.1-.8 2-1.7 2.7v2.2h2.7c1.6-1.5 2.6-3.7 2.6-6.9z" fill="#4285F4"/><path d="M12 22c2.7 0 4.9-.9 6.6-2.4l-2.7-2.2c-.8.5-1.8.8-3.9.8-3 0-5.6-2-6.5-4.8H2.7v2.4C4.5 19.9 8 22 12 22z" fill="#34A853"/><path d="M5.5 13.6c-.2-.5-.3-1-.3-1.6s.1-1.1.3-1.6V7.9H2.7C1.9 9.6 1.4 11.6 1.4 12s.5 2.4 1.3 4.1l2.8-2.5z" fill="#FBBC05"/><path d="M12 6.5c1.5 0 2.6.5 3.4 1l2.6-2.6C16.8 3.5 14.6 2.6 12 2.6 8 2.6 4.5 4.7 2.7 7.9l2.8 2.4C6.4 8.5 9 6.5 12 6.5z" fill="#EA4335"/></svg>
        <span>{loading ? "Connexion..." : "Se connecter avec Google"}</span>
      </button>
      {error && <div className="text-red-400 mt-2">{error}</div>}
    </div>
  );
}
