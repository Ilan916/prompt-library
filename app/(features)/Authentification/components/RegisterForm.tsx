"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const { register, handleSubmit, formState } = useForm<FormData>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        setError(body?.message || "Erreur lors de l'inscription");
        return;
      }

      router.push("/");
    } catch (e) {
      setError("Erreur réseau");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-slate-800 p-6 rounded-lg">
      <h2 className="text-2xl text-white mb-4">Créer un compte</h2>

      <div className="grid grid-cols-2 gap-3">
        <input {...register("first_name", { required: true })} placeholder="Prénom" className="p-2 rounded bg-slate-700 text-white" />
        <input {...register("last_name", { required: true })} placeholder="Nom" className="p-2 rounded bg-slate-700 text-white" />
      </div>

      <div className="mt-3">
        <input {...register("username", { required: true })} placeholder="Nom d'utilisateur" className="w-full p-2 rounded bg-slate-700 text-white" />
      </div>

      <div className="mt-3">
        <input {...register("email", { required: true })} placeholder="Email" type="email" className="w-full p-2 rounded bg-slate-700 text-white" />
      </div>

      <div className="mt-3">
        <input {...register("password", { required: true, minLength: 6 })} placeholder="Mot de passe" type="password" className="w-full p-2 rounded bg-slate-700 text-white" />
      </div>

      {error && <div className="text-red-400 mt-3">{error}</div>}

      <div className="mt-4 flex items-center justify-between">
        <button type="submit" className="bg-slate-200 text-black px-4 py-2 rounded font-semibold">S'inscrire</button>
      </div>
    </form>
  );
}
