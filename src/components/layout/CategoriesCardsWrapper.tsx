import { Show } from '@prisma/client'
import HomeShowCard from '../ui/cards/HomeShowCard'

const CategoryCardsWrapper: React.FC<{ shows: Show[] }> = ({ shows }) => {
  return (
    <div className="grid sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4  mx-auto">
      {shows.map(show => {
        return <HomeShowCard key={show.id} show={show} />
      })}
    </div>
  )
}

export default CategoryCardsWrapper
