import { NewsFacade } from '../facades/NewsFacade'
import { News, Response } from '../models/types/News'
import { Banner, ResponseBanner } from '../models/types/Banner'
import { deleteImage } from '../utils/cloudinary/Cloudinary'
import { getImageFromCacheOrCloudinary } from '../utils/cacheFunction/CacheFunction'

const facade = new NewsFacade()

export class NewsHelper {
  async getNewsById(id: string): Promise<News> {
    return await facade.getNewsById(id)
  }

  async getAllNews(data?: any): Promise<Response> {
    const { newsPerPage } = data

    const news: News[] = await facade.getAllNews(data)

    if (!news || !news[0]) return { news: [] }

    for (const e of news) {
      const buffer = await getImageFromCacheOrCloudinary(e.image[0].secure_url)

      //convertir el buffer en una url para mandar al front

      const base64Image = Buffer.from(buffer).toString('base64')

      // tipo de imagen: .jpg, .png etc.
      const type = e.image[0].secure_url.match(/\.([^.]+)$/)
      if (!type) return null
      const contentType = type[1].toLowerCase()

      const imageUrl = `data:${contentType};base64,${base64Image}`

      // console.log('URL', imageUrl)
      e.image[0].imageUrl = imageUrl
    }

    if (newsPerPage) {
      // const bannerImages: Banner[] = await facade.getAllBannerImages()

      const quantity = await facade.countNews()

      const totalPages = Math.ceil(quantity / newsPerPage)

      // return { totalPages, news, banner: bannerImages }
      return { totalPages, news }
    }
    return { news }
  }

  async createNews(data: News): Promise<News> {
    return await facade.createNews(data)
  }

  async updateNews(id: string, news: News, data: any): Promise<News> {
    //me traigo el news y if hay imagen que las elimine deleteImage(public_id)

    const { newImages, deleteImages, ...dataUpdated } = data

    const image = news.image
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

    return await facade.updateNews(id, dataUpdated)
  }

  async deleteNews(id: string, news: News): Promise<News> {
    for (const img of news.image) {
      await deleteImage(img.public_id)
    }

    return await facade.deleteNews(id)
  }

  //---------- BANNER -----------------------

  async getBannerImageById(id: string): Promise<Banner> {
    return await facade.getBannerImageById(id)
  }

  async getAllBannerImages(data?: any): Promise<ResponseBanner> {
    const { bannerPerPage } = data

    const banners: Banner[] = await facade.getAllBannerImages(data)
    if (!banners || !banners[0]) return { banners: [] }

    for (const e of banners) {
      const buffer = await getImageFromCacheOrCloudinary(e.image.secure_url)

      //convertir el buffer en una url para mandar al front

      const base64Image = Buffer.from(buffer).toString('base64')

      // tipo de imagen: .jpg, .png etc.
      const type = e.image.secure_url.match(/\.([^.]+)$/)
      if (!type) return null
      const contentType = type[1].toLowerCase()

      const imageUrl = `data:${contentType};base64,${base64Image}`

      // console.log('URL', imageUrl)
      e.image.imageUrl = imageUrl
    }

    if (bannerPerPage) {
      const quantity = await facade.countBanners()

      const totalPages = Math.ceil(quantity / bannerPerPage)

      return { totalPages, banners }
    }
    return { banners }
  }

  async createBannerImage(data: Banner): Promise<Banner> {
    return await facade.addBannerImage(data)
  }

  async updateBannerImage(id: string, data: any): Promise<Banner> {
    return await facade.updateBannerImage(id, data)
  }

  async deleteBannerImage(id: string, banner: Banner): Promise<Banner> {
    if (banner.image?.public_id) {
      await deleteImage(banner.image.public_id)
    }

    return await facade.deleteBannerImage(id)
  }
}
