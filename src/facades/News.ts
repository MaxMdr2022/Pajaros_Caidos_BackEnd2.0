import { PostgresDBStorage } from '../storages/PostgresDBStorage'
import { NewsListModel } from '../storages/DB'
import { News } from '../models/types/News'

const storage = new PostgresDBStorage()

export class NewsFacade {
  async getNewsById(id: string): Promise<News> {
    return await storage.findById(NewsListModel, id)
  }

  async getAllNews(filters?: any): Promise<News> {
    const { pageNumber, newsPerPage } = filters

    const filter: any = {}

    if (pageNumber) {
      const skip = (pageNumber - 1) * newsPerPage
      filter.order = [['createdAt', 'asc']]
      filter.limit = newsPerPage
      filter.offset = skip
    }

    return await storage.find(NewsListModel, filter)
  }

  async createNews(data: News): Promise<News> {
    return await storage.create(NewsListModel, data)
  }

  async updateNews(id: string, data: any): Promise<News> {
    return await storage.update(NewsListModel, { ...data }, { where: { id } })
  }

  async deleteNews(id: string): Promise<News> {
    return await storage.delete(NewsListModel, { where: { id } })
  }
}
