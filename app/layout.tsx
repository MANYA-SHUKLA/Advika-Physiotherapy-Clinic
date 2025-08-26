import "./globals.css";
import Script from "next/script";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Physiotherapy Clinic",
  description: "Resurs Clone with Next.js + Tailwind",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>

        {/* ✅ Navbar & Footer wrap every page */}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
