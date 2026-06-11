import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="auth-gradient relative min-h-screen overflow-hidden">
      <header className="flex items-center justify-between px-6 py-5 md:px-10">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground font-display font-bold">T</div>
          <span className="font-display text-xl font-semibold">Taskly</span>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/login" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">Sign in</Link>
          <Link
            to="/register"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90"
          >
            Get started <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      <main className="relative mx-auto max-w-3xl px-6 pb-20 pt-16 text-center md:pt-28">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium backdrop-blur animate-in fade-in slide-in-from-bottom-2">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> A focused workspace for your tasks
        </div>
        <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl animate-in fade-in slide-in-from-bottom-3">
          Organize your work.<br />
          <span className="text-primary">Ship faster.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg animate-in fade-in duration-700">
          A modern task workspace inspired by Linear, Notion and Vercel. Built to make CRUD feel delightful.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 animate-in fade-in duration-700">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90"
          >
            Create free account <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold hover:bg-muted"
          >
            Sign in
          </Link>
        </div>
      </main>
    </div>
  );
}
