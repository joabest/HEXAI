import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cenured",
  description: "Central privada com landing, lista de espera e chat com IA.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
