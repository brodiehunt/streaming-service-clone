// What do I need to do?

import { getShowBySlug } from '@/utils/show'

// 1. Get the content above the fold (Cateogry information)
// 2. Render the hero (above the fold)
// 3. Render the episodes for the current season - This defaults to one for now
// 4. Render some 'new' shows... Just do a related category for now...

export default async function ShowPage({
  params,
}: {
  params: { showSlug: string }
}) {
  const show = await getShowBySlug({ slug: params.showSlug })
  console.log('The show', show)
  return <div>This is the show page</div>
}
