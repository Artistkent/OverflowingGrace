import Navigation from "./_components/navigation/navbar"
import Footer from "./_components/footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Overflowing Grace",
  description: "Built by Artistkent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
    
      <Navigation />
        {children}
        <Footer />
        </body>
     
    </html>
  );
}
