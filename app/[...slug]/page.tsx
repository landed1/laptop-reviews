import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import CategoryButtons from "@/components/CategoryButtons";
import type { Metadata, ResolvingMetadata } from "next";

// Define the params type for the dynamic route
type PostParams = {
  params: Promise<{ slug: string[] }>;
  searchParams: { [key: string]: string | string[] | undefined };
};

// Generate static parameters for all files in the content folder
export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "content");
  const params: string[][] = [];

  const years = fs.readdirSync(contentDir);

  years.forEach((year) => {
    const yearPath = path.join(contentDir, year);

    if (fs.statSync(yearPath).isDirectory()) {
      const months = fs.readdirSync(yearPath);

      months.forEach((month) => {
        const monthPath = path.join(yearPath, month);

        if (fs.statSync(monthPath).isDirectory()) {
          const files = fs
            .readdirSync(monthPath)
            .filter((file) => file.endsWith(".mdx"));

          files.forEach((file) => {
            const slug = file.replace(/\.mdx$/, "");
            params.push([year, month, slug]);
          });
        }
      });
    }
  });

  return params.map((slug) => ({
    slug,
  }));
}

async function getPostData(slug: string[]) {
  const [year, month, fileName] = slug;
  const filePath = path.join(
    process.cwd(),
    "content",
    year,
    month,
    `${fileName}.mdx`
  );

  if (!fs.existsSync(filePath)) {
    throw new Error("Post not found");
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const components = {
    CategoryButtons,
  };

  const { content: mdxContent } = await compileMDX({
    source: content,
    options: { parseFrontmatter: true },
    components,
  });

  return {
    meta: data,
    content: mdxContent,
  };
}

export async function generateMetadata(
  { params }: PostParams,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const [, , postSlug] = resolvedParams.slug;
  const postData = await getPostData(resolvedParams.slug);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: postData.meta.title || `Best Laptops: ${postSlug}`,
    description:
      postData.meta.description || `Discover the best laptops for ${postSlug}`,
    openGraph: {
      images: [...previousImages],
    },
  };
}

export default async function Page({ params }: PostParams) {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.slug);

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-4'>{postData.meta.title}</h1>
      <p className='text-gray-600 mb-8'>
        {new Date(postData.meta.date).toLocaleDateString()}
      </p>
      <p>{postData.meta.tags}</p>
      <p>{postData.meta.category}</p>
      <article className='prose lg:prose-xl'>{postData.content}</article>
    </main>
  );
}
