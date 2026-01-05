"use client"
import { useRouter } from "next/navigation";
import { Ghost, Home, ArrowLeft } from "lucide-react";

export default function NotFoundClient() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 text-center p-6">
            <div className="animate-bounce">
                <Ghost className="w-24 h-24 text-lime-600 dark:text-lime-400" />
            </div>

            <h1 className="mt-6 text-5xl font-extrabold text-gray-900 dark:text-white">
                404 — Page not found
            </h1>

            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-md">
                You’ve reached a page that doesn’t exist.
                <br />
                Even well-typed URLs sometimes wander off.
            </p>

            <p className="mt-2 text-sm italic text-gray-500 dark:text-gray-400">
                “The map is not the territory.” — Korzybski
            </p>

            <div className="flex gap-3 mt-8">

                <a
                    href="/"
                    className="flex items-center gap-2 px-5 py-3 bg-lime-600 hover:bg-lime-700 text-white rounded-xl font-semibold shadow-md transition-all"
                >
                    <Home className="w-5 h-5" />
                    Back to home
                </a>
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Go back
                </button>
            </div>
        </div>
    );
}
