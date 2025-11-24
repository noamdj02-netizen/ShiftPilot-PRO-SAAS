import React from "react";

export const metadata = {
  title: "ShiftPilot",
  description: "Minimal placeholder layout",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head />
      <body>
        {children}
      </body>
    </html>
  );
}
