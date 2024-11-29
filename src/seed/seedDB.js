/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client')
const { categories } = require('./categoriesData.js')
const { showsData } = require('./gameOfThronesData.js')

const prisma = new PrismaClient()

async function cleanDatabase() {
  console.log('🧹 Cleaning database...')

  // Clean up in reverse order of dependencies
  await prisma.watchHistory.deleteMany()
  await prisma.favoriteShow.deleteMany()
  await prisma.episode.deleteMany()
  await prisma.season.deleteMany()
  await prisma.showsOnCategories.deleteMany()
  await prisma.show.deleteMany()
  await prisma.category.deleteMany()
}

async function seedCategories() {
  console.log('🌱 Seeding categories...')

  const createdCategories = await Promise.all(
    categories.map(category =>
      prisma.category.create({
        data: category,
      }),
    ),
  )

  console.log(`✅ Seeded ${createdCategories.length} categories`)
  return createdCategories
}

async function seedShows(categories) {
  console.log('🎬 Starting to seed shows...')

  const shows = []

  for (const showData of showsData) {
    // Get the categories for this specific show
    const showCategories = categories.filter(cat =>
      showData.categories.includes(cat.title),
    )

    if (showCategories.length !== showData.categories.length) {
      throw new Error(`Missing required categories for ${showData.show.title}`)
    }

    // Create the show with all its relationships
    const show = await prisma.show.create({
      data: {
        title: showData.show.title,
        slug: showData.show.slug,
        description: showData.show.description,
        heroImage: showData.show.heroImage,
        thumbnail: showData.show.thumbnail,
        rating: showData.show.rating,
        totalSeasons: showData.show.totalSeasons,
        // Connect categories
        categories: {
          create: showCategories.map(category => ({
            category: {
              connect: { id: category.id },
            },
          })),
        },
        // Create seasons with nested episodes
        seasons: {
          create: showData.show.seasons.map(season => ({
            seasonNumber: season.seasonNumber,
            description: season.description,
            episodes: {
              create: season.episodes,
            },
          })),
        },
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        seasons: {
          include: {
            episodes: true,
          },
        },
      },
    })

    const totalEpisodes = show.seasons.reduce(
      (sum, season) => sum + season.episodes.length,
      0,
    )

    console.log(`✅ Seeded ${show.title} with:`)
    console.log(`   - ${show.seasons.length} seasons`)
    console.log(`   - ${totalEpisodes} total episodes`)
    console.log(`   - ${show.categories.length} categories`)

    shows.push(show)
  }

  console.log(`\n🎉 Successfully seeded ${shows.length} shows`)
  return shows
}

async function main() {
  try {
    // Start with a clean database
    await cleanDatabase()

    // Seed categories first
    const seededCategories = await seedCategories()

    // Seed Game of Thrones
    // await seedGameOfThrones(seededCategories)
    await seedShows(seededCategories)

    console.log('✨ Database seeding completed successfully!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Execute the seeding

main().catch(e => {
  console.error(e)
  process.exit(1)
})
