import type { Metadata } from "next";
import "./globals.css";
import "./durable-design.css";

export const metadata: Metadata = {
  title: "Elevate for Humanity | Workforce Training & Career Development",
  description: "Career & Technical training that elevates communities. FREE workforce development programs through WIOA funding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://portal.elevateforhumanity.org/" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
