import { PostgresDBStorage } from '../storages/PostgresDBStorage'
import { Bird } from '../models/types/Bird'

const storage = new PostgresDBStorage()

export class BirdFacade {
  async getBirdById(id: string): Promise<Bird> {
    return await storage.findBirdById(id)
  }

  async getAllBirds(limit?: number, filter?: any): Promise<Bird[]> {
    return await storage.findAllBirds(limit, filter)
  }

  async createBird(data: any): Promise<Bird> {
    return await storage.createBird(data)
  }

  async updateBird(id: string, data: any): Promise<Bird> {
    return await storage.updateBird(id, data)
  }
}
