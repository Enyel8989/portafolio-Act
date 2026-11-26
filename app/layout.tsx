import type { Metadata } from "next";
import { profile } from "../data/portfolio";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: `${profile.name} | Portafolio`, template: "%s | Portafolio de Ángel" },
  description: "Portafolio académico de Ángel Lemuel López Ortíz. Proyectos de datos, automatización y desarrollo web.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html:
          'try { if (localStorage.getItem("portfolio-theme") === "light") document.documentElement.dataset.theme = "light"; } catch {}'
        }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
