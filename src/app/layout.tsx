import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AppScrip Shop - Discover Our Products",
  description: "Explore our premium collection of products with seamless filtering and sorting.",
};

import { FavoritesProvider } from "@/context/FavoritesContext";
import { FilterProvider } from "@/context/FilterContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FavoritesProvider>
          <FilterProvider>
            {children}
          </FilterProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
