import { NewsFacade } from '../facades/News'
import { News } from '../models/types/News'

const facade = new NewsFacade()

export class NewsHelper {
  async getNewsById(id: string): Promise<News> {
    return await facade.getNewsById(id)
  }

  async getAllNews(data?: any): Promise<News> {
    return await facade.getAllNews(data)
  }

  async createNews(data: News): Promise<News> {
    return await facade.createNews(data)
  }

  async updateNews(id: string, data: any): Promise<News> {
    return await facade.updateNews(id, data)
  }

  async deleteNews(id: string): Promise<News> {
    return await facade.deleteNews(id)
  }
}
