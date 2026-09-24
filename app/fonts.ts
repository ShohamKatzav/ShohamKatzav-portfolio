import { IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";

export const display = Source_Serif_4({
  variable: "--font-display",
  subsets: ["latin"],
});

export const body = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const fontClasses = `${display.variable} ${body.variable}`;

export const themeScript = `(function(){var d=true;try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light')d=t==='dark'}catch(e){}document.documentElement.classList.toggle('dark',d)})()`;
