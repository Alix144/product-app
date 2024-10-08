import { Roboto } from "next/font/google";

import "./globals.css";
import Header from "@/components/layout/Header";
import NextAuthProvider from "@/providers/NextAuthProvider";
import ReduxProvider from "../redux/ReduxProvider";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ReduxProvider>
          <NextAuthProvider>
            <main className="p-4 max-w-4xl mx-auto">
              <Header />
              {children}
            </main>
          </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
