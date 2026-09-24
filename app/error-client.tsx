"use client";
import { useRouter } from "next/navigation";
import { Home, RefreshCw } from "lucide-react";

export default function ErrorClient() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-bg px-4 py-24 text-fg sm:px-6">
            <div className="mx-auto max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">Error</p>
                <h1 className="mt-3 font-serif text-5xl font-semibold">Something broke</h1>
                <p className="mt-4 text-lg text-muted">
                    The page failed to render. Try again, or go back to the home page.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={() => router.refresh()}
                        className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-medium text-accent-label transition-colors hover:bg-accent-hover"
                    >
                        <RefreshCw className="h-5 w-5" aria-hidden />
                        Try again
                    </button>
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 rounded-md border border-outline px-5 py-3 font-medium text-fg transition-colors hover:border-fg"
                    >
                        <Home className="h-5 w-5" aria-hidden />
                        Back to home
                    </a>
                </div>
            </div>
        </main>
    );
}
