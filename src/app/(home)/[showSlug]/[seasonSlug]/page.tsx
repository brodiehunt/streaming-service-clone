export default async function AllEpisodesPage({
  params: { showSlug, seasonSlug },
}: {
  params: { showSlug: string; seasonSlug: string }
}) {
  const [, seasonNumString] = seasonSlug.split('-')
  const seasonNumber = Number(seasonNumString)
  console.log(`Show Slug: ${showSlug}, seasonNumber: ${seasonNumber}`)
  return <div></div>
}
