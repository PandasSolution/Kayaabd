import { Providers } from "@/redux/provider";
import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";
import { Poppins } from "next/font/google";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Kayaa",
  description: "A House of Deshi Culture !!",
};

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--tp-ff-body",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <Providers>
          <CookiesProvider>{children}</CookiesProvider>
        </Providers>
      </body>
    </html>
  );
}
