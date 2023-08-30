import { Publication } from '../models/types/Publication'
import { PublicationFacade } from '../facades/PublicationFacade'
import { deleteImage } from '../utils/cloudinary/Cloudinary'

const facade = new PublicationFacade()

type Response = {
  publications: Publication[]
  totalPages?: number
}

export class PublicationHelper {
  // async getQuantityPublications():Promise<number>{

  // }

  async createPublication(userId: string, data: any): Promise<Publication> {
    return await facade.createPublication(userId, data)
  }

  async getAllPublications(data?: any): Promise<Response> {
    let { postPerPage, filter } = data

    const currentDate = new Date()
    data.currentDate = currentDate

    if (filter === 'day') {
      const startOfDay = new Date(currentDate)
      startOfDay.setHours(0, 0, 0, 0) // Establecer a las 00:00:00
      data.filter = startOfDay

      const endOfDay = new Date(currentDate)
      endOfDay.setHours(23, 59, 59, 999) // Establecer a las 23:59:59
      data.currentDate = endOfDay
    }
    if (filter === 'week') {
      const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000) // Hace una semana
      data.filter = oneWeekAgo
    }

    if (filter === 'month') {
      const oneMonthAgo = new Date(currentDate)
      oneMonthAgo.setMonth(currentDate.getMonth() - 1) // Hace un mes
      data.filter = oneMonthAgo
    }

    const publications = await facade.getAllPublications(data)

    if (!publications) return { publications: [] }
    if (postPerPage) {
      const quantity = await facade.countPublications()

      const totalPages = Math.ceil(quantity / postPerPage)

      return { totalPages, publications }
    }
    return { publications }
  }

  async getPublicationById(id: string): Promise<Publication> {
    return await facade.getPublicationById(id)
  }

  async updatePublication(id: string, publication: Publication, data: any): Promise<Publication> {
    const { newImages, deleteImages, ...dataUpdated } = data

    const image = publication.image
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

    return await facade.updatePublication(id, dataUpdated)
  }

  async deletePublication(id: string, publication: Publication): Promise<Publication> {
    for (const img of publication.image) {
      await deleteImage(img.public_id)
    }
    return await facade.deletePublication(id)
  }
}
