import type { Metadata } from "next";
import Sidebar from "./components/ui/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mannequin SaaS",
  description: "Gestion d'agence de mannequins",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-10">{children}</main>
        </div>
      </body>
    </html>
  );
}