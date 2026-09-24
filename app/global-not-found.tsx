import './globals.css'
import { fontClasses, themeScript } from './fonts';
import NotFoundClient from './not-found-client';

export const metadata = {
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist.',
}

export default function GlobalNotFound() {
    return (
        <html lang="en" className={fontClasses} suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </head>
            <body className="font-sans antialiased">
                <NotFoundClient />
            </body>
        </html>
    );
}
