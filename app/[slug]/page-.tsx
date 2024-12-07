import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardHeader, CardBody, Button } from '@nextui-org/react'
import { getLatestCategoryMdx } from '@/lib/mdx'
import { generateCategoryPageSeo } from '@/lib/seo'

interface LaptopReview {
  title: string
  slug: string
  date: string
  description: string
  image?: string
  purchaseLinks?: { 
    name: string
    url: string 
  }[]
}

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params
  const reviews = await getLatestCategoryMdx(category)

  // Assuming the first review is the top pick
  const topPick = reviews[0]

  return (
    <div className="container mx-auto px-4 py-8">
      {topPick ? (
        <section className="mb-12 bg-soft-blue rounded-lg p-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
            {topPick.image && (
              <Image 
                src={topPick.image} 
                alt={topPick.title} 
                width={300} 
                height={200} 
                className="rounded-lg shadow-lg"
              />
            )}
          </div>
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold text-primary-dark mb-4">
              Top Pick: {topPick.title}
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              {topPick.description}
            </p>
            {topPick.purchaseLinks && (
              <div className="flex space-x-4">
                {topPick.purchaseLinks.map((link) => (
                  <Button 
                    key={link.name}
                    as={Link} 
                    href={link.url} 
                    target="_blank" 
                    color="primary"
                    variant="solid"
                  >
                    Buy from {link.name}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : (
        <p className="text-center text-gray-500">No reviews available for this category</p>
      )}

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.slice(1).map((review) => (
          <Card 
            key={review.slug} 
            className="hover:shadow-lg transition-shadow duration-300"
            isPressable
          >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h2 className="text-xl font-bold text-accent-teal">
                {review.title}
              </h2>
              <p className="text-small text-default-500">{review.date}</p>
            </CardHeader>
            <CardBody>
              <p className="text-default-400">{review.description}</p>
              <Link 
                href={`/reviews/${category}/${review.slug}`} 
                className="mt-4 inline-block"
              >
                <Button color="secondary" variant="light">
                  Read Full Review
                </Button>
              </Link>
            </CardBody>
          </Card>
        ))}
      </section>
    </div>
  )
}

// Generate dynamic metadata for the category page
export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = params
  return generateCategoryPageSeo(category)
}

// Generate static params for category pages
export async function generateStaticParams() {
  // This would typically come from your MDX content structure
  return [
    { category: 'laptops-under-400' },
    { category: 'laptops-under-600' },
    { category: 'laptops-under-1000' },
    { category: 'high-end-laptops' }
  ]
}