import {promises as fs} from 'fs'
import path from 'path'
//import { compareDesc, parseISO } from 'date-fns'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { compileMDX } from 'next-mdx-remote/rsc'
import { serialize } from "next-mdx-remote/serialize";


// Define the structure of our MDX frontmatter
export interface MdxFrontmatter {
  title: string
  description: string
  date: string
  tags: string[]
  category: string
  topPick: {
    title: string
    description: string
    image: string
    purchaseLinks: Array<{
      name: string
      url: string
    }>
  }
}

export async function parseMdxFileWithSerialize(filePath: string) {
  try {
    const source = await fs.readFile(filePath, "utf8");

    // Serialize the MDX content for rendering with MDXRemote
    const serializedContent = await serialize(source, {
      mdxOptions: {
        remarkPlugins: [remarkGfm,remarkRehype,rehypeStringify],
      },
    });

    return {
      content: serializedContent,
      slug: path.basename(filePath, ".mdx"), // Extract filename as slug
    };
  } catch (error) {
    console.error(`Error parsing MDX file ${filePath}:`, error);
    throw error;
  }
}

// Helper to get all MDX files
export async function getMdxFiles(directory: string): Promise<string[]> {
  const contentDir = path.join(process.cwd(), directory)
  //console.log("contentDir ",contentDir)
  
  const walkDir = async (dir: string): Promise<string[]> => {
    const files = await fs.readdir(dir, { withFileTypes: true })
    const mdxFiles: string[] = []

    for (const file of files) {
      const res = path.resolve(dir, file.name)
      if (file.isDirectory()) {
        mdxFiles.push(...await walkDir(res))
      } else if (file.name.endsWith('.mdx')) {
        mdxFiles.push(res)
      }
    }

    return mdxFiles
  }

  return walkDir(contentDir)
}


// Parse individual MDX file
export async function parseMdxFile(filePath: string) {
  try {
    const source = await fs.readFile(filePath, 'utf8')

    const { frontmatter, content } = await compileMDX({
      source,
      options: {
        parseFrontmatter: true
      },
    })

    return {
      ...frontmatter,
      slug: path.basename(filePath, '.mdx'),
      content
    }
  } catch (error) {
    console.error(`Error parsing MDX file ${filePath}:`, error)
    throw error // Re-throw to allow caller to handle
  }
}

// Get MDX files by tag
/*export async function getMdxFilesByTag(tag: string):Promise<MdxFrontmatter[]> {
  const mdxFiles = await getMdxFiles('/content/mdx_content')
  const taggedFiles = []

  for (const file of mdxFiles) {
    const { frontmatter } = await compileMDX<MdxFrontmatter>({
      source: await fs.readFile(file, 'utf8'),
      options: { parseFrontmatter: true }
    })

    if (frontmatter.tags && frontmatter.tags.includes(tag)) {
      const parsedFile = await parseMdxFile(file)
      taggedFiles.push(parsedFile)
    }
  }

  return taggedFiles.sort((a, b) => 
    compareDesc(parseISO(a.date), parseISO(b.date))
  )
}*/


export async function getLinakbleCategories(){
  const mdxFiles = await getMdxFiles('content/mdx_content')
  //console.log("mdxFiles ",mdxFiles)
  const frontMatterArray = []
  //we need the front matter from each to send
  for (const file of mdxFiles) {
    //console.log("file ",file)
    const { frontmatter } = await compileMDX<MdxFrontmatter>({
      source: await fs.readFile(file, 'utf8'),
      options: { parseFrontmatter: true }
    })
    frontMatterArray.push(frontmatter)
  }
  return frontMatterArray;
}

// Get latest MDX file for a specific category
export async function getLatestCategoryMdx(category: string) {
  const mdxFiles = await getMdxFiles('content/mdx_content')
  //console.log("mdxFiles ",mdxFiles)

  for (const file of mdxFiles) {
    //console.log("file ",file)
    const { frontmatter } = await compileMDX<MdxFrontmatter>({
      source: await fs.readFile(file, 'utf8'),
      options: { parseFrontmatter: true }
    })

    if (frontmatter.category === category) {
      const parsedFile = await parseMdxFile(file)
      return parsedFile;
      //categoryFiles.push(parsedFile)
    }
  }
  

  // Sort by date (most recent first)
  /*return categoryFiles
    .sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)))
    .slice(0, limit)*/
}