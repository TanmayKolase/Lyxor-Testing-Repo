import "./globals.css";
import React from "react";

export const metadata = {
  title: "Lyxor Testing App",
  description: "Demo app with user profile update form",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-root">
          <header className="app-header">
            <h1>Lyxor Testing</h1>
          </header>
          <main className="app-main">{children}</main>
        </div>
      </body>
    </html>
  );
}


