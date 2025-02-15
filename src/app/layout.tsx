import type { Metadata } from "next";
import "./globals.css";
import ClientSideToastContainer from "@/components/ToastifyContainer/ToastifyContainer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
      >
        <ClientSideToastContainer />
        {children}
      </body>
    </html>
  );
}
