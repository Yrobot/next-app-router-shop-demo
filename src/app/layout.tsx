import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `RB Shop`,
  description:
    "This is a shop demo based on the Next.ts 13.4 app router, Tailwindcss and DaisyUI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="wireframe">
      <body>{children}</body>
    </html>
  );
}
