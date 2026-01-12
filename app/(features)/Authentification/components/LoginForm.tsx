"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { register, handleSubmit } = useForm<FormData>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        setError(body?.message || "Erreur lors de la connexion");
        return;
      }

      router.push("/");
    } catch (e) {
      setError("Erreur réseau");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-slate-800 p-6 rounded-lg">
      <h2 className="text-2xl text-white mb-4">Se connecter</h2>

      <div>
        <input {...register("email", { required: true })} placeholder="Email" type="email" className="w-full p-2 rounded bg-slate-700 text-white" />
      </div>

      <div className="mt-3">
        <input {...register("password", { required: true })} placeholder="Mot de passe" type="password" className="w-full p-2 rounded bg-slate-700 text-white" />
      </div>

      {error && <div className="text-red-400 mt-3">{error}</div>}

      <div className="mt-4 flex items-center justify-between">
        <button type="submit" className="bg-slate-200 text-black px-4 py-2 rounded font-semibold">Connexion</button>
      </div>
    </form>
  );
}
