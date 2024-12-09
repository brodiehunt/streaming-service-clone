import Image from 'next/image'

const CategoryShowsHero: React.FC<{
  category: { title: string; color: string; imgUrl: string }
}> = ({ category }) => {
  return (
    <div className="relative h-[50vh] xl:h-[90vh]">
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          className="object-cover object-center w-full h-full"
          src={category.imgUrl}
          alt=""
          fill={true}
          priority={true}
        />
        <div
          style={{
            background: `linear-gradient(80deg, ${category.color} 0%, transparent 70%)`,
          }}
          className="absolute top-0 left-0 bottom-0 right-0 z-10"
        ></div>
        <div className="absolute top-0 left-0 w-full h-full bg-black-bezier-to-top bg-bottom bg-no-repeat z-10"></div>
      </div>

      <header className="relative px-layout-x-large z-10 top-[40%] xl:top-[30%]">
        <h1 className="text-2xl md:text-4xl xl:text-6xl font-bold">
          {category.title}
        </h1>
      </header>
    </div>
  )
}

export default CategoryShowsHero
