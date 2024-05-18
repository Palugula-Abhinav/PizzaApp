import { Roboto } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";
import AppContext from "@/components/AppContext";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "Food Application",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen relative pb-[120px]">
        <main className="max-w-4xl mx-auto p-4">
          <AppContext>
            <Header />
            {children}
            <footer className="border-t p-8 text-center text-gray-500 mt-16 absolute bottom-0 left-0 right-0">
              &copy; 2024 All Rights reserved
            </footer>
          </AppContext>
        </main>
      </body>
    </html>
  );
}