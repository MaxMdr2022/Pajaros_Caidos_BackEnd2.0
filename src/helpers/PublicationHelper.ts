import { Publication } from '../models/types/Publication'
import { PublicationFacade } from '../facades/PublicationFacade'

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

  async updatePublication(id: string, data: any): Promise<Publication> {
    return await facade.updatePublication(id, data)
  }

  async deletePublication(id: string): Promise<Publication> {
    return await facade.deletePublication(id)
  }
}
