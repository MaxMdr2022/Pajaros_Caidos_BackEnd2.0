import { ItemFacade } from '../facades/ItemFacade'
import { Item, Response } from '../models/types/Item'
import { Category } from '../models/types/Category'
import { deleteImage } from '../utils/cloudinary/Cloudinary'
import { getImageFromCacheOrCloudinary } from '../utils/cacheFunction/CacheFunction'

const facade = new ItemFacade()

export class ItemHelper {
  async createItem(data: any): Promise<Item> {
    const newItem = await facade.createItem(data)

    return newItem
  }

  async getAllItems(data?: any): Promise<Response> {
    const { itemPerPage } = data

    const items: Item[] = await facade.getItems(data)

    if (!items || !items[0]) return { items: [] }

    for (const e of items) {
      for (const i of e.image) {
        const buffer = await getImageFromCacheOrCloudinary(i.secure_url)

        //convertir el buffer en una url para mandar al front

        const base64Image = Buffer.from(buffer).toString('base64')

        // tipo de imagen: .jpg, .png etc.
        const type = i.secure_url.match(/\.([^.]+)$/)
        if (!type) return null
        const contentType = type[1].toLowerCase()

        const imageUrl = `data:${contentType};base64,${base64Image}`

        // console.log('URL', imageUrl)
        i.imageUrl = imageUrl
      }
    }

    if (itemPerPage) {
      // const bannerImages: Banner[] = await facade.getAllBannerImages()

      const quantity = await facade.countItems()

      const totalPages = Math.ceil(quantity / itemPerPage)

      // return { totalPages, news, banner: bannerImages }
      return { totalPages, items }
    }
    return { items }
  }

  async getItemById(id: string): Promise<Item> {
    return await facade.getItemById(id)
  }

  async getItemByName(name: string): Promise<Item> {
    return await facade.getItemByName(name)
  }

  async updateItem(id: string, data: any): Promise<Item> {
    const { newImages, deleteImages, ...dataUpdated } = data

    const image = data.item.image
    dataUpdated.image = image

    if (deleteImages && deleteImages[0]) {
      const imageNoDeleted = image.filter((e) => !deleteImages.find((el) => e.public_id === el))

      dataUpdated.image = imageNoDeleted

      for (const img of deleteImages) {
        await deleteImage(img)
      }
    }

    if (newImages && newImages[0]) {
      const updatedImages = [...dataUpdated.image, ...newImages]
      dataUpdated.image = updatedImages
    }

    return await facade.updateItem(id, dataUpdated)
  }

  async removeCategory(item: Item, category: Category): Promise<Item> {
    return await facade.removeCategory(item, category)
  }

  async deleteItem(id: string, item: Item): Promise<Item> {
    for (const img of item.image) {
      await deleteImage(img.public_id)
    }
    return await facade.deleteItem(id)
  }

  //---------------------- CATEGORY -------------------------------

  async createCategory(name: string): Promise<Category> {
    return await facade.createCategory(name)
  }

  async getCategoriesByName(name: string[]): Promise<Category[]> {
    return await facade.getCategoriesByName(name)
  }

  async getCategoryById(id: string): Promise<Category> {
    return await facade.getCategoryById(id)
  }

  async getCategoryByName(name: string): Promise<Category> {
    return await facade.getCategoryByName(name)
  }

  async getAllCategories(): Promise<Category[]> {
    return await facade.getAllCategories()
  }

  async checkCategories(categories: string[]): Promise<string[]> {
    const allCategories = await facade.getAllCategories()

    if (!allCategories || !allCategories[0]) return ['not categories']

    const invalidCategories = categories.filter((e) => !allCategories.find((el) => el.name === e))

    if (!invalidCategories || !invalidCategories[0]) return null
    return invalidCategories
  }

  async updateCategory(id: string, name: string): Promise<Category> {
    return await facade.updateCategory(id, name)
  }

  async deleteCategory(id: string): Promise<Category> {
    return await facade.deleteCategory(id)
  }
}
