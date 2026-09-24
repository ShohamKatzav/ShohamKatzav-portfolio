"use client"
import { useRouter } from "next/navigation";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFoundClient() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-bg px-4 py-24 text-fg sm:px-6">
            <div className="mx-auto max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">404</p>
                <h1 className="mt-3 font-serif text-5xl font-semibold">Page not found</h1>
                <p className="mt-4 text-lg text-muted">
                    There is nothing at this address.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-medium text-accent-label transition-colors hover:bg-accent-hover"
                    >
                        <Home className="h-5 w-5" aria-hidden />
                        Back to home
                    </a>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 rounded-md border border-outline px-5 py-3 font-medium text-fg transition-colors hover:border-fg"
                    >
                        <ArrowLeft className="h-5 w-5" aria-hidden />
                        Go back
                    </button>
                </div>
            </div>
        </main>
    );
}
