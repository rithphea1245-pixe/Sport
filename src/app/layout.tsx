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

export const metadata: Metadata = {
  title: "SportHub - National Sports, Tournaments & Arenas",
  description:
    "Premier sports portal featuring live national tournaments, arenas, community match discussions, and favorites.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${battambang.variable} h-full antialiased`} suppressHydrationWarning>
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
