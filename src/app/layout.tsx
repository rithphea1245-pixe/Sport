import type { Metadata } from "next";
import { Poppins, Battambang } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shadcn-space/blocks/navbar-01/navbar";
import { Footer2 } from "@/components/footer2";
import { RoleProvider } from "@/context/role-context";
import { ThemeProvider } from "@/context/theme-context";
import { LanguageProvider } from "@/context/language-context";
import { FavoritesProvider } from "@/context/favorites-context";
import { AuthModal } from "@/components/auth/auth-modal";
import { FavoritesSheet } from "@/components/sports/favorites-sheet";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const battambang = Battambang({
  weight: ["300", "400", "700", "900"],
  subsets: ["khmer", "latin"],
  variable: "--font-battambang",
  display: "swap",
});

/**
 * Applies the saved theme to <html> before the browser paints, so a dark-mode
 * visitor never sees a white flash while React hydrates.
 */
const themeInitScript = `(function(){try{var s=localStorage.getItem('sporthub_theme');var d=s==='dark'||s==='light'?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');var r=document.documentElement;if(d==='dark'){r.classList.add('dark')}r.setAttribute('data-theme',d);r.style.colorScheme=d;}catch(e){}})();`;

export const metadata: Metadata = {
  title: "SportHub - National Sports, Tournaments & Arenas",
  description:
    "Premier sports portal featuring live national tournaments, arenas, community match discussions, and favorites.",
  applicationName: "SportHub",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "SportHub",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${battambang.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#F8F9F3] text-[#12150D]">
        <ThemeProvider>
          <LanguageProvider>
            <RoleProvider>
              <FavoritesProvider>
                <Navbar />
                <div className="flex-1">{children}</div>
                <Footer2 />
                <AuthModal />
                <FavoritesSheet />
              </FavoritesProvider>
            </RoleProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
