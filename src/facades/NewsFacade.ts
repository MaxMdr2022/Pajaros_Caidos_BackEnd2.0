import { MySQLDBStorage } from '../storages/MySQLDBStorage'
import { NewsListModel, BannerListModel } from '../storages/DB'
import { News } from '../models/types/News'
import { Banner } from '../models/types/Banner'

const storage = new MySQLDBStorage()

export class NewsFacade {
  async countNews(): Promise<number> {
    return await storage.count(NewsListModel)
  }

  async getNewsById(id: string): Promise<News> {
    return await storage.findById(NewsListModel, id)
  }

  async getAllNews(filters?: any): Promise<News[]> {
    const { pageNumber, newsPerPage } = filters

    const filter: any = {}

    if (pageNumber) {
      const skip = (pageNumber - 1) * newsPerPage
      filter.order = [['createdAt', 'desc']]
      filter.limit = parseInt(newsPerPage, 10)
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

  //--------------- BANNER ---------------------------

  async countBanners(): Promise<number> {
    return await storage.count(BannerListModel)
  }

  async getBannerImageById(id: string): Promise<Banner> {
    return await storage.findById(BannerListModel, id)
  }
  async getAllBannerImages(filters?: any): Promise<Banner[]> {
    const { pageNumber, bannerPerPage } = filters

    const filter: any = {}

    if (pageNumber) {
      const skip = (pageNumber - 1) * bannerPerPage
      filter.order = [['createdAt', 'desc']]
      filter.limit = parseInt(bannerPerPage, 10)
      filter.offset = skip
    }

    return await storage.find(BannerListModel, filter)
  }

  async addBannerImage(data: Banner): Promise<Banner> {
    return await storage.create(BannerListModel, data)
  }

  async updateBannerImage(id: string, data: any): Promise<Banner> {
    return await storage.update(BannerListModel, { ...data }, { where: { id } })
  }

  async deleteBannerImage(id: string): Promise<Banner> {
    return await storage.delete(BannerListModel, { where: { id } })
  }
}
