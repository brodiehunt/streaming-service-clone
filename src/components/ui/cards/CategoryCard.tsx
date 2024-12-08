import { Category } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
const CategoryCard: React.FC<{ category: Category }> = ({ category }) => {
  return (
    <article className="relative w-full aspect-[21/9] rounded-lg overflow-hidden flex items-center">
      <Link
        href={`/shows/${category.slug}`}
        title={`View ${category.title} shows`}
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <Image
            src={category.imageUrl}
            alt={`${category.title} category thumbnail`}
            fill={true}
            className="object-cover object-center w-full h-full"
          />
          <div
            style={{
              background: `linear-gradient(60deg, ${category.hexColor} 0%, transparent 70%)`,
            }}
            className="absolute top-0 left-0 bottom-0 right-0 z-10"
          ></div>
        </div>

        <h2 className="font-bold text-xl text-white w-[50%] pl-4 relative z-10">
          {category.title}
        </h2>
      </Link>
    </article>
  )
}

export default CategoryCard
