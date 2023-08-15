import { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coupleflix - Recommendações de filmes e séries",
  description: "Recommendações de filmes e séries",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <link rel="icon" href="/icon.png" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
