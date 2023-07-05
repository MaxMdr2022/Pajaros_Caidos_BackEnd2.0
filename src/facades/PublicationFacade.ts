import { Publication } from '../models/types/Publication'
import { PostgresDBStorage } from '../storages/PostgresDBStorage'

const storage = new PostgresDBStorage()

export class PublicationFacade {
  async createPublication(userId: string, data: any): Promise<Publication> {
    return await storage.createPublication(userId, data)
  }

  async getAllPublications(): Promise<Publication[]> {
    return await storage.findAllPublications()
  }

  async getPublicationById(id: string): Promise<Publication> {
    return await storage.findPublicationById(id)
  }

  async updatePublication(id: string, data: any): Promise<Publication> {
    return await storage.updatePublication(id, data)
  }
}
