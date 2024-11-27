import prisma from '@/lib/prisma'
import { Category } from '@prisma/client'

export type CategoryButton = {
  id: number
  slug: string
  title: string
}

export const getCategoriesTitleAndSlug = async ({
  userId,
}: {
  userId: number | null
}): Promise<CategoryButton[] | null> => {
  // User Id will be used to get 'continue watching' and 'for you' lists??
  console.log(userId, 'The user Id - getCategoriesTitleAndSlug')
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
      },
    })
    return categories
  } catch {
    return null
  }
}

export const getCategoriesInfo = async (): Promise<Category[] | null> => {
  try {
    const categories = await prisma.category.findMany({})
    return categories
  } catch {
    return null
  }
}
