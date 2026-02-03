import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DropdownElement } from "./components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Keegan",
  description: "New next.js app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;


}>) {
  const dropDown1 = [
    {buttonLabel:"Home", link:"/"},
    {buttonLabel:"Stats", link:"/stats"},
    {buttonLabel:"Google", link:"https://google.com"}
  ];
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="flex gap-4">
          <a href="/"><img className='web-logo'src="./favicon.ico"/></a>
          <DropdownElement dropdownLabel="Dropdown" buttons={dropDown1} />
        </nav>
        {children}
      </body>
    </html>
  );
}
