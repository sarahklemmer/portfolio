import { Inter, Roboto_Mono } from "next/font/google";
import Navbar from "../components/Navbar";
import Providers from "../components/Providers";
import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export const metadata = {
  title: "Sarah Klemmer",
  description: "Software Engineer",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${robotoMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-gray-900 dark:text-white transition-colors">
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
