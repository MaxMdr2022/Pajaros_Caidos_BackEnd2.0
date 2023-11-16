import { Publication, PublicationAndUser } from '../models/types/Publication'
import { PublicationFacade } from '../facades/PublicationFacade'
import { deleteImage } from '../utils/cloudinary/Cloudinary'
import { getImageFromCacheOrCloudinary } from '../utils/cacheFunction/CacheFunction'

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

    const publications: PublicationAndUser[] = await facade.getAllPublications(data)

    if (!publications) return { publications: [] }

    for (const e of publications) {
      if (e.image[0].secure_url) {
        console.log('image: ', e.image[0])

        const buffer = await getImageFromCacheOrCloudinary(e.image[0].secure_url)

        //convertir el buffer en una url para mandar al front

        const base64Image = Buffer.from(buffer).toString('base64')

        // tipo de imagen: .jpg, .png etc.
        const type = e.image[0].secure_url.match(/\.([^.]+)$/)
        if (!type) return null
        const contentType = type[1].toLowerCase()

        const imageUrl = `data:${contentType};base64,${base64Image}`

        console.log('URL', imageUrl)
        e.image[0].imageUrl = imageUrl

        const data: any = e
        data.dataValues.image[0].imageUrl = imageUrl
        console.log('datavalua:::', e.image[0].imageUrl)
      }

      if (e.user && e.user.avatar.imageUrl) {
        const buffer = await getImageFromCacheOrCloudinary(e.user.avatar.secure_url)

        //convertir el buffer en una url para mandar al front

        const base64Image = Buffer.from(buffer).toString('base64')

        // tipo de imagen: .jpg, .png etc.
        // const type = e.image[0].secure_url.match(/\.([^.]+)$/)
        const type = e.user.avatar.secure_url.match(/\.([^.]+)$/)
        if (!type) return null
        const contentType = type[1].toLowerCase()

        const imageUrl = `data:${contentType};base64,${base64Image}`

        // console.log('URL', imageUrl)
        e.user.avatar.imageUrl = imageUrl
      }
    }

    if (postPerPage) {
      const quantity = await facade.countPublications()

      const totalPages = Math.ceil(quantity / postPerPage)

      const public2: any = publications
      for (const post of public2) {
        const commentsQuantity = await facade.QuantityComments(post.id)
        post.dataValues.commentsQuantity = commentsQuantity
      }

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
      if (img.public_id) {
        await deleteImage(img.public_id)
      }
    }
    return await facade.deletePublication(id)
  }
}
