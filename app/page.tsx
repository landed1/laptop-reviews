import { getMdxFiles, getLinakbleCategories } from "@/lib/mdx";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const links = await getLinakbleCategories();

  //console.log("links", links);

  return (
    <div>
      <section className='container mx-auto py-12 px-6'>
        <h1 className='text-4xl font-bold mb-6'>Explore Our Buyers Guides</h1>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {links.map((link) => (
            <Link
              key={link.category}
              href={`/${link.category}`}
              className='block p-6 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition'>
              <h2 className='text-2xl font-semibold mb-2'>{link.title}</h2>
              <p className='text-gray-700'>{link.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
