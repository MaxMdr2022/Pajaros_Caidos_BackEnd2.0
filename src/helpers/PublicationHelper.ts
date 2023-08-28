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
    const { postPerPage } = data

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
