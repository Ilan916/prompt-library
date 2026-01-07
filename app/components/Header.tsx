import Link from "next/link";

function Header() {
  return (
    <nav className="flex h-20 items-center justify-between px-8">
      <h1 className="text-slate-200 text-2xl font-bold">PromptIIt</h1>

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
    </nav>
  );
}

export default Header;
