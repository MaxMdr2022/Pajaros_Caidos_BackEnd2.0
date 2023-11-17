import { MySQLDBStorage } from '../storages/MySQLDBStorage'
import { Item } from '../models/types/Item'
import { Category } from '../models/types/Category'
import { CategoryListModel, ItemListModel } from '../storages/DB'
import { Op } from 'sequelize'

const storage = new MySQLDBStorage()

export class ItemFacade {
  async countItems(): Promise<number> {
    return await storage.count(ItemListModel)
  }

  async createItem(data: any): Promise<Item> {
    console.log('data_ ', data)

    const newItem: Item = await storage.create(ItemListModel, data)

    const filter = {
      where: {
        name: {
          [Op.in]: data.category,
        },
      },
    }
    const categories: Category[] = await storage.find(CategoryListModel, filter)

    if (!categories || !categories[0]) return null

    for (const category of categories) {
      console.log('cat: ', category, 'newItem: ', newItem)

      await storage.relationship(newItem, 'addCategory', category)
      await storage.relationship(category, 'addItem', newItem)
    }

    return newItem
  }

  async getItemById(id: string): Promise<Item> {
    const filter = {
      include: [
        {
          model: CategoryListModel,
          through: { attributes: [] },
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
    }

    const item: Item = await storage.findById(ItemListModel, id, filter)

    return item
  }

  async getItems(data?: any): Promise<Item[]> {
    const {
      categoriesArray,
      name,
      minPrice,
      maxPrice,
      pageNumber,
      itemPerPage,
      limit,
      orderName,
      orderPrice,
      orderCreate,
    } = data

    const filter: any = {
      include: [
        {
          model: CategoryListModel,
          through: { attributes: [] },
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
    }

    if (name) {
      filter.where = { title: name }
    }

    if (minPrice) {
      filter.where = {
        price: {
          [Op.between]: [minPrice, maxPrice],
        },
      }
    }

    if (limit) {
      filter.limit = parseInt(limit, 10)
    }

    if (orderName) {
      filter.order = [['title', orderName]]
    }

    if (orderPrice) {
      filter.order = [['price', orderPrice]]
    }

    if (orderCreate) {
      filter.order = [['createdAt', orderCreate]]
    }

    if (categoriesArray[0]) {
      filter.include[0].where = {
        name: {
          [Op.in]: categoriesArray,
        },
      }
    }

    if (pageNumber) {
      // al paginar, setear algún tipo de order (pageNumber, itemPerPage, orderCreate)
      const skip = (pageNumber - 1) * itemPerPage

      filter.limit = parseInt(itemPerPage, 10)
      filter.offset = skip
    }

    const items: Item[] = await storage.find(ItemListModel, filter)
    return items
  }

  async getItemByName(name: string): Promise<Item> {
    const filter = { where: { name } }

    const item = await storage.find(ItemListModel, filter)

    if (!item || !item[0]) return null

    return item[0]
  }

  async updateItem(id: string, data: any): Promise<Item> {
    const { category } = data

    if (category) {
      const filter = {
        where: {
          name: {
            [Op.in]: data.category,
          },
        },
      }

      const categories: Category[] = await storage.find(CategoryListModel, filter) // nombre

      if (!categories) return null

      for (const category of categories) {
        await storage.relationship(data.item, 'addCategory', category)
      }
    }

    const itemUpdated: Item = await storage.update(ItemListModel, { ...data }, { where: { id } })

    return itemUpdated
  }

  async removeCategory(item: Item, category: Category): Promise<Item> {
    await storage.relationship(item, 'removeCategory', category)

    const filter = {
      include: [
        {
          model: CategoryListModel,
          through: { attributes: [] },
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
    }

    const itemUpdated: Item = await storage.findById(ItemListModel, item.id, filter)

    return itemUpdated
  }

  async deleteItem(id: string): Promise<Item> {
    const filter = {
      where: { id },
    }

    const itemDeleted: Item = await storage.delete(ItemListModel, filter)

    return itemDeleted
  }
  //----------------- category ---------------------------

  async getAllCategories(): Promise<Category[]> {
    const categories: Category[] = await storage.find(CategoryListModel)
    return categories
  }

  async getCategoriesByName(name: string[]): Promise<Category[]> {
    const filter = {
      where: {
        name: {
          [Op.in]: name,
        },
      },
    }

    const categories: Category[] = await storage.find(CategoryListModel, filter)
    return categories
  }

  async getCategoryById(id: string): Promise<Category> {
    const category: Category = await storage.findById(CategoryListModel, id)
    return category
  }

  async getCategoryByName(name: string): Promise<Category> {
    const filter = { where: { name } }

    const category: Category = await storage.find(CategoryListModel, filter)

    if (!category || !category[0]) return null

    return category[0]
  }

  async createCategory(name: any): Promise<Category> {
    const newCategory: Category = await storage.create(CategoryListModel, { name })
    return newCategory
  }

  async updateCategory(id: string, name: string): Promise<Category> {
    return await storage.update(CategoryListModel, { name }, { where: { id } })
  }

  async deleteCategory(id: string): Promise<Category> {
    return await storage.delete(CategoryListModel, { where: { id } })
  }
}
