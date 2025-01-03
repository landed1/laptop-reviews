//import { getLinakbleCategories } from "@/lib/mdx";
//import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Laptop Reviews For UK Market - Non Techy Laptop Buying Guide",
  description:
    "We use AI inteligently to read all the latest real human reviews on laptops and provide you with the best laptops in the market.",
  metadataBase: new URL("https://laptop-review.co.uk"),
  alternates: {
    canonical: "./",
  },
};

export default function Home() {
  return (
    <>
      <section className='container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center gap-8'>
        <div className='flex-1 space-y-6'>
          <h1 className='text-4xl md:text-6xl font-bold text-[#3a0ca3]'>
            Find Your Perfect Laptop
          </h1>
          <p className='text-xl text-gray-600'>
            Expert reviews and recommendations tailored for the UK market.
          </p>
          <Link
            href='/explore'
            className='inline-block bg-[#f72585] text-white px-8 py-3 rounded-full hover:bg-[#7209b7] transition-colors'>
            Start Exploring
          </Link>
        </div>
        <div className='flex-1'>
          <img
            src='/api/placeholder/600/400'
            alt='Laptop showcase'
            className='rounded-lg shadow-xl'
          />
        </div>
      </section>

      <section className='bg-gray-50 py-16'>
        <div className='container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {[
            "Save time finding a laptop",
            "Get great value",
            "No technical knowledge needed",
            "Trusted UK reviews",
          ].map((text) => (
            <div key={text} className='flex items-start space-x-4'>
              <CheckCircle className='text-[#4cc9f0] flex-shrink-0' size={24} />
              <div>
                <h3 className='text-xl font-semibold mb-2'>{text}</h3>
                <p className='text-gray-600'>
                  We make the process simple and straightforward.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <img
            src='/api/placeholder/1200/400'
            alt='Laptop inspiration'
            className='rounded-lg shadow-xl w-full'
          />
        </div>
      </section>

      <section className='bg-gray-50 py-16'>
        <div className='container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[
            "Laptops under £300",
            "Laptops under £500",
            "Laptops £500-£700",
            "Laptops £700-£1000",
            "Mac Laptops under £800",
            "Mac Laptops under £1300",
          ].map((category) => (
            <Link
              key={category}
              href={`/category/${category.toLowerCase().replace(/ /g, "-")}`}
              className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow group'>
              <div className='flex justify-between items-center'>
                <h3 className='text-xl font-semibold text-[#3a0ca3]'>
                  {category}
                </h3>
                <ChevronRight className='text-[#f72585] group-hover:translate-x-2 transition-transform' />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <div className='flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4'>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className='flex-none w-72 mx-4 snap-center'>
                <img
                  src={`/api/placeholder/280/200`}
                  alt={`Top pick ${i}`}
                  className='rounded-lg shadow-lg'
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='bg-gray-50 py-16'>
        <div className='container mx-auto px-4'>
          <div className='space-y-4'>
            <Link
              href='/2024/12/best-laptops'
              className='block text-[#3a0ca3] hover:text-[#f72585]'>
              December 2024 Reviews
            </Link>
            <Link
              href='/2025/1/best-laptops'
              className='block text-[#3a0ca3] hover:text-[#f72585]'>
              January 2025 Reviews
            </Link>
            <Link
              href='/2025/2/best-laptops'
              className='block text-[#3a0ca3] hover:text-[#f72585]'>
              February 2025 Reviews
            </Link>
          </div>
        </div>
      </section>

      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <div className='space-y-4'>
            {[
              {
                q: "How do you choose which laptops to review?",
                a: "We focus on laptops readily available in the UK market across various price points.",
              },
              {
                q: "Are your reviews independent?",
                a: "Yes, all our reviews are independent and based on thorough testing.",
              },
              {
                q: "How often do you update your recommendations?",
                a: "We update our recommendations monthly to reflect new releases and price changes.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className='bg-white rounded-lg shadow-lg p-6 group'>
                <summary className='text-lg font-semibold cursor-pointer'>
                  {faq.q}
                </summary>
                <p className='mt-4 text-gray-600'>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className='bg-[#4361ee] text-white py-16'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold mb-8'>Stay Updated</h2>
          <div className='max-w-md mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-lg'>
            <p className='mb-6 text-gray-100'>
              Subscribe for the latest reviews and deals
            </p>
            <div className='h-12 bg-white/20 rounded-lg' />
          </div>
        </div>
      </section>
    </>
  );
}
