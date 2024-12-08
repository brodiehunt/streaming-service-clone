import CategoriesWrapper from '@/components/ui/homepage/CategoriesWrapper'
import HomeHero from '@/components/ui/heros/HomeHero'

export default async function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <HomeHero />
      <section className="px-layout-x-large relative md:mt-[-100px]">
        <CategoriesWrapper />
      </section>
    </div>
  )
}
