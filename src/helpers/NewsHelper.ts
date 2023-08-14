import { NewsFacade } from '../facades/NewsFacade'
import { News, Response } from '../models/types/News'
import { Banner } from '../models/types/Banner'

const facade = new NewsFacade()

export class NewsHelper {
  async getNewsById(id: string): Promise<News> {
    return await facade.getNewsById(id)
  }

  async getAllNews(data?: any): Promise<Response> {
    const { newsPerPage } = data

    const news: News[] = await facade.getAllNews(data)

    if (!news || !news[0]) return { news: [] }

    if (newsPerPage) {
      const bannerImages: Banner[] = await facade.getAllBannerImages()

      const quantity = await facade.countNews()

      const totalPages = Math.ceil(quantity / newsPerPage)

      return { totalPages, news, banner: bannerImages }
    }
    return { news }
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

  //---------- BANNER -----------------------

  async getBannerImageById(id: string): Promise<Banner> {
    return await facade.getBannerImageById(id)
  }

  async getAllBannerImages(): Promise<Banner[]> {
    const bannerImages: Banner[] = await facade.getAllBannerImages()
    if (!bannerImages || !bannerImages[0]) return []
    return bannerImages
  }

  async createBannerImage(data: Banner): Promise<Banner> {
    return await facade.addBannerImage(data)
  }

  async updateBannerImage(id: string, data: any): Promise<Banner> {
    return await facade.updateBannerImage(id, data)
  }

  async deleteBannerImage(id: string): Promise<Banner> {
    return await facade.deleteBannerImage(id)
  }
}
