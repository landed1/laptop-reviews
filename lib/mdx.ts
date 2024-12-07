import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { compareDesc, parseISO } from 'date-fns'

// Define the structure of our MDX frontmatter
export interface MdxFrontmatter {
  title: string
  date: string
  category: string
  tags: string[]
  description: string
  image?: string
}

// Helper to get all MDX files
export async function getMdxFiles(directory: string): Promise<string[]> {
  const contentDir = path.join(process.cwd(), directory)
  
  const walkDir = async (dir: string): Promise<string[]> => {
    const files = await fs.promises.readdir(dir, { withFileTypes: true })
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
  const source = await fs.promises.readFile(filePath, 'utf8')
  const { frontmatter, content } = await compileMDX<MdxFrontmatter>({
    source,
    options: {
      parseFrontmatter: true
    }
  })

  return {
    ...frontmatter,
    slug: path.basename(filePath, '.mdx'),
    content
  }
}

// Get MDX files by tag
export async function getMdxFilesByTag(tag: string) {
  const mdxFiles = await getMdxFiles('content/mdx_content')
  const taggedFiles = []

  for (const file of mdxFiles) {
    const { frontmatter } = await compileMDX<MdxFrontmatter>({
      source: await fs.promises.readFile(file, 'utf8'),
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
}

// Get latest MDX files for a specific category
export async function getLatestCategoryMdx(category: string, limit = 3) {
  const mdxFiles = await getMdxFiles('content/mdx_content')
  const categoryFiles = []

  for (const file of mdxFiles) {
    const { frontmatter } = await compileMDX<MdxFrontmatter>({
      source: await fs.promises.readFile(file, 'utf8'),
      options: { parseFrontmatter: true }
    })

    if (frontmatter.category === category) {
      const parsedFile = await parseMdxFile(file)
      categoryFiles.push(parsedFile)
    }
  }

  // Sort by date (most recent first)
  return categoryFiles
    .sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)))
    .slice(0, limit)
}