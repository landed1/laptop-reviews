import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import CategoryButtons from "@/components/CategoryButtons";
import { Metadata } from "next";

interface PageParams {
  slug: string[];
}

interface PageProps {
  params: PageParams;
  searchParams: { [key: string]: string | string[] | undefined };
}

// Generate static parameters for all files in the content folder
export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const postData = await getPostData(params.slug);
  const [, , slug] = params.slug;

  return {
    title: postData.meta.title || `Best Laptops: ${slug}`,
    description:
      postData.meta.description || `Discover the best laptops for ${slug}`,
  };
}

// Add type annotation for the return type
export default async function Page({ params }: PageProps) {
  const postData = await getPostData(params.slug);

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
