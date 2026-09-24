"use client";
import ErrorClient from './error-client';
import './globals.css'
import { fontClasses, themeScript } from './fonts';

export const metadata = {
    title: '500 - Page Not Found',
    description: 'Internal Error.',
}

export default function GlobalError() {
    return (
        <html lang="en" className={fontClasses} suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </head>
            <body className="font-sans antialiased">
                <ErrorClient />
            </body>
        </html>
    );
}
