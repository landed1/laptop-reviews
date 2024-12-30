import React from "react";
//import Image from "next/image";
//import Link from "next/link";
//import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import { parseMdxFile } from "@/lib/mdx";
import { generateCategoryPageSeo } from "@/lib/seo";
//import { MDXRemote } from "next-mdx-remote/rsc";
//import { mdxComponents } from "../../mdx-components"; // Adjust the import path
//import { serialize } from "next-mdx-remote/serialize";

interface CategoryPageProps {
  params: Promise<{ category: string[] }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  //console.log("params ", params);
  //const pageData = await getLatestCategoryMdx(category);
  const loc = `content/mdx_content/${category}.mdx`;
  const { content } = await parseMdxFile(loc);
  //const { title, topPick, content } = await parseMdxFileWithSerialize(loc);
  //const data = await parseMdxFile2(loc);

  //console.log("Content\n\n\n", content);

  //console.log("top pick \n\n", topPick);
  return (
    <>
      {/*<h1>Category page: {title}</h1>
      <div className='container mx-auto px-4 py-8'>
        <section className='mb-12 bg-soft-blue rounded-lg p-6 flex flex-col md:flex-row items-center'>
          <div className='md:w-1/3 mb-4 md:mb-0 md:mr-6'>
            {topPick.image && (
              <Image
                src={topPick.image}
                alt={topPick.title}
                width={300}
                height={200}
                className='rounded-lg shadow-lg'
              />
            )}
          </div>
          <div className='md:w-2/3'>
            <h1 className='text-3xl font-bold text-primary-dark mb-4'>
              Top Pick: {topPick.title}
            </h1>
            <p className='text-lg text-gray-700 mb-4'>{topPick.description}</p>
            {topPick.purchaseLinks && (
              <div className='flex space-x-4'>
                {topPick.purchaseLinks.map((link: object) => (
                  <Button
                    key={link.name}
                    as={Link}
                    href={link.url}
                    target='_blank'
                    color='primary'
                    variant='solid'>
                    Buy from {link.name}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </section>
       
      </div>*/}
      <article className='prose max-w-none'>
        <h2>Raw content below works but TABLE md not parsed</h2>
        <h1>Example Page with MDX Tables</h1>
        <div>{content}</div>
      </article>
    </>
  );
}

// Generate dynamic metadata for the category page
export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = params;
  return generateCategoryPageSeo(category);
}

// Generate static params for category pages
export async function generateStaticParams() {
  // This would typically come from your MDX content structure
  return [
    { category: "laptops-under-400" },
    { category: "laptops-under-600" },
    { category: "laptops-under-1000" },
    { category: "high-end-laptops" },
  ];
}
