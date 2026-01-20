import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Sidebar from "./components/ui/Sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Mannequin SaaS - Premium Agency",
  description: "Gestion d'agence de mannequins - Luminous Edition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <body className={`${inter.variable} ${playfair.variable} font-sans antialiased text-gray-900`}>
          <div className="flex min-h-screen">
            <SignedIn>
              <Sidebar />
              <main className="flex-1 p-10 relative z-10 ml-72">{children}</main>
            </SignedIn>
            <SignedOut>
              <main className="flex-1 flex items-center justify-center min-h-screen">
                {children}
              </main>
            </SignedOut>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}