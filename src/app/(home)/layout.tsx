import type { Metadata } from "next";
import "@/app/globals.css";
import Header from "@/components/common/home/header";
import Footer from "@/components/common/home/footer";

export const metadata: Metadata = {
  title: "NDC|デザインカタログサイト",
  description: "Next.js・TypeScript・Tailwind CSSで作成したデザインカタログサイトです。",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header/>
        {children}
      <Footer/>
    </>
  );
}