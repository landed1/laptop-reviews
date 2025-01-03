"use client";

//import type { Metadata } from "next";
import "./globals.css";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { ThemeProvider } from "@/providers/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Providers } from "./providers";

//export const dynamicParams = ;

/*const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});*/

/*export const metadata: Metadata = {
  title: "Laptop Reviews",
  description:
    "We use AI inteligently to read all the latest real human reviews on laptops and provide you with the best laptops in the market.",
  metadataBase: new URL("https://laptop-review.co.uk"),
  alternates: {
    canonical: "./",
  },
};*/

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <html lang='en'>
      <body className='bg-white' suppressHydrationWarning>
        <Providers>
          <nav className='fixed w-full bg-[#4361ee] text-white z-50'>
            <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
              <Link href='/' className='text-2xl font-bold'>
                LaptopReview
              </Link>
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='p-2 hover:bg-[#3a0ca3] rounded-lg'>
                <Menu size={24} />
              </button>
            </div>
          </nav>

          {isMenuOpen && (
            <div className='fixed inset-0 z-50'>
              <div className='absolute inset-0 bg-black/60 backdrop-blur-sm' />
              <div className='relative h-full flex flex-col bg-[#4361ee]/30 text-white p-8'>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className='absolute right-4 top-4 p-2 hover:bg-[#3a0ca3] rounded-lg'>
                  <X size={24} />
                </button>
                <div className='flex flex-col space-y-6 mt-16 text-xl'>
                  <Link href='/' className='hover:text-[#f72585]'>
                    Home
                  </Link>
                  <Link href='/laptops' className='hover:text-[#f72585]'>
                    Laptops
                  </Link>
                  <Link href='/reviews' className='hover:text-[#f72585]'>
                    Reviews
                  </Link>
                  <Link href='/guides' className='hover:text-[#f72585]'>
                    Guides
                  </Link>
                  <Link href='/about' className='hover:text-[#f72585]'>
                    About
                  </Link>
                  <Link href='/contact' className='hover:text-[#f72585]'>
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          )}

          <main className='pt-16'>{children}</main>

          <footer className='bg-[#3a0ca3] text-white py-12'>
            <div className='container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div>
                <h3 className='text-xl font-bold mb-4'>About Us</h3>
                <p className='text-gray-300'>
                  Expert laptop reviews and guides for the UK market.
                </p>
              </div>
              <div>
                <h3 className='text-xl font-bold mb-4'>Quick Links</h3>
                <ul className='space-y-2 text-gray-300'>
                  <li>
                    <Link href='/reviews' className='hover:text-[#f72585]'>
                      Latest Reviews
                    </Link>
                  </li>
                  <li>
                    <Link href='/guides' className='hover:text-[#f72585]'>
                      Buying Guides
                    </Link>
                  </li>
                  <li>
                    <Link href='/contact' className='hover:text-[#f72585]'>
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className='text-xl font-bold mb-4'>Connect</h3>
                <p className='text-gray-300'>
                  Follow us on social media for the latest updates.
                </p>
              </div>
            </div>
            <div className='container mx-auto px-4 mt-8 pt-8 border-t border-gray-700 text-center text-gray-300'>
              <p>&copy; 2025 LaptopReview.co.uk. All rights reserved.</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
