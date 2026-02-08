import type { Metadata , Viewport} from "next";
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
 
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, 
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;


}>) {
  const dropDown1 = [
    {buttonLabel:"Home", link:"/"},
    {buttonLabel:"Stats", link:"/stats"},
    {buttonLabel:"Other Site", link:"http://keegan.mac"},
    {buttonLabel:"Image of the Day", link:"/IOTD"}
  ];
  const dropDown2 = [
    {buttonLabel:"Google", link:"https://google.com"},
    {buttonLabel:"YouTube", link:"https://youtube.com"},
    {buttonLabel:"VLE", link:"https://vle.york.ac.uk"}
  ];
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="fixed top-0 left-0 right-0 flex justify-center h-20 z-50 bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-white/10">
        <nav className="flex items-center gap-14">
          <DropdownElement dropdownLabel="Personal Links" buttons={dropDown1} />
          <a href="/"><img className="w-[35px] h-[35px] transition-transform duration-200 ease-in-out hover:scale-92" src="/favicon.ico"/></a>
          <DropdownElement dropdownLabel="External Sites" buttons={dropDown2} />
        </nav>
        </header>
        <main className="pt-28">
          {children}
        </main>
      </body>
    </html>
  );
}
