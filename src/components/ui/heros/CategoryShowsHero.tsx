import Image from 'next/image'

const CategoryShowsHero: React.FC<{
  category: { title: string; color: string; imgUrl: string }
}> = ({ category }) => {
  return (
    <div className="">
      <Image src={category.imgUrl} alt="" width={1600} height={1600} />
      <header className="">
        <h1 className="">{category.title}</h1>
      </header>
    </div>
  )
}

export default CategoryShowsHero
