import { ItemFacade } from '../facades/ItemFacade'
import { Item } from '../models/types/Item'
import { Category } from '../models/types/Category'

const facade = new ItemFacade()

export class ItemHelper {
  async createItem(data: any): Promise<Item> {
    const newItem = await facade.createItem(data)

    return newItem
  }

  async getAllItems(data?: any): Promise<Item[]> {
    return await facade.getItems(data)
  }

  async getItemById(id: string): Promise<Item> {
    return await facade.getItemById(id)
  }

  async getItemByName(name: string): Promise<Item> {
    return await facade.getItemByName(name)
  }

  async updateItem(id: string, data: any): Promise<Item> {
    return await facade.updateItem(id, data)
  }

  async removeCategory(item: Item, category: Category): Promise<Item> {
    return await facade.removeCategory(item, category)
  }

  async deleteItem(id: string): Promise<Item> {
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
