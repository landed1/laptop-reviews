import Link from "next/link";
import React from "react";

type Category = {
  title: string;
  slug: string;
};

type CategoryButtonsProps = {
  basePath: string;
  categories: Category[];
};

const CategoryButtons: React.FC<CategoryButtonsProps> = ({
  basePath,
  categories,
}) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
      {categories.map((category) => (
        <Link
          className='block text-center px-4 py-2 bg-blue-500 text-white rounded'
          key={category.slug}
          href={`${basePath}${category.slug}`}>
          <span>{category.title}</span>
        </Link>
      ))}
    </div>
  );
};
export default CategoryButtons;
