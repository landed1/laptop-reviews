import { Metadata } from 'next'

interface SeoProps {
  title: string
  description: string
  slug?: string
  image?: string
  tags?: string[]
  publishedTime?: string
}

export function generateSeo({
  title, 
  description, 
  slug = '', 
  image = '/default-og-image.png',
  tags = [],
  publishedTime
}: SeoProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.laptopreviews.com'
  const canonicalUrl = `${baseUrl}/${slug}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Laptop Reviews',
      images: [{ 
        url: image.startsWith('http') ? image : `${baseUrl}${image}` 
      }],
      type: 'article',
      ...(publishedTime && { publishedTime })
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
    },
    keywords: tags,
    metadataBase: new URL(baseUrl)
  }
}

// Utility to generate tag page SEO
export function generateTagPageSeo(tag: string): Metadata {
  return generateSeo({
    title: `Laptop Reviews tagged with ${tag}`,
    description: `All laptop reviews and articles tagged with ${tag}`,
    slug: `tags/${tag}`,
    tags: [tag]
  })
}

// Utility to generate category page SEO
export function generateCategoryPageSeo(category: string, date?: string): Metadata {
  const title = date 
    ? `Best Laptops ${category} - ${date}` 
    : `Best Laptops ${category}`
  
  return generateSeo({
    title,
    description: `Comprehensive reviews of the best laptops in the ${category} category`,
    slug: `reviews/${category}`,
    tags: [category]
  })
}