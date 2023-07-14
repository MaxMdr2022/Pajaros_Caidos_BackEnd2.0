import { Publication } from '../models/types/Publication'
import { PublicationFacade } from '../facades/PublicationFacade'

const facade = new PublicationFacade()

export class PublicationHelper {
  async createPublication(userId: string, data: any): Promise<Publication> {
    return await facade.createPublication(userId, data)
  }

  async getAllPublications(limit: number): Promise<Publication[]> {
    return await facade.getAllPublications(limit)
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
