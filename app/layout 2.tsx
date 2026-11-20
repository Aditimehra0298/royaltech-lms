import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Royal Tech Innovation — Royal Tech Innovation LMS",
  description:
    "Transformative learning and professional development through the Royal Tech Innovation Learning Management System.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
