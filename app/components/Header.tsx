"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function Header() {
  const authenticated = true; // replace with real auth state

  const user = {
    name: "Ilan",
    avatarUrl: "/avatar-placeholder.png",
  };

  return (
    <nav className="flex h-20 items-center justify-between px-8">
      <h1 className="text-slate-200 text-2xl font-bold">PromptIIt</h1>

      {!authenticated ? (
        <div className="flex gap-4">
          <Link
            href="/login"
            className="min-w-24 rounded-md border border-slate-200 bg-slate-200 px-2 py-1.5 text-center font-bold hover:bg-slate-300 hover:border-slate-300"
          >
            Se connecter
          </Link>

          <Link
            href="/register"
            className="min-w-24 rounded-md border border-slate-200 px-2 py-1.5 text-center font-bold text-slate-200 hover:border-slate-300"
          >
            S'inscrire
          </Link>
        </div>
      ) : (
        <ProfileDropdown user={user} />
      )}
    </nav>
  );
}

function ProfileDropdown({ user }: { user: { name: string; avatarUrl: string } }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  function handleLogout() {
    // TODO: replace with real logout logic
    console.log("logout");
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 rounded-md px-3 py-1 hover:bg-slate-700"
        aria-expanded={open}
      >
        <img
          src={user.avatarUrl}
          alt="avatar"
          className="w-8 h-8 rounded-full bg-slate-500 object-cover"
        />
        <span className="text-slate-200 font-medium">{user.name}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg py-2 z-50">
          <Link
            href="/profile"
            className="block px-4 py-2 text-slate-200 hover:bg-slate-700"
            onClick={() => setOpen(false)}
          >
            Profil
          </Link>

          <Link
            href="/favorite"
            className="block px-4 py-2 text-slate-200 hover:bg-slate-700"
            onClick={() => setOpen(false)}
          >
            Favoris
          </Link>

          <Link
            href="/prompts"
            className="block px-4 py-2 text-slate-200 hover:bg-slate-700"
            onClick={() => setOpen(false)}
          >
            Mes prompts
          </Link>

          <div className="border-t border-slate-700 my-1" />

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-700"
          >
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
