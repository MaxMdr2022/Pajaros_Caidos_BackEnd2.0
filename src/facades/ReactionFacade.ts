import { PostgresDBStorage } from '../storages/PostgresDBStorage'
import { Reaction } from '../models/types/Reaction'

const storage = new PostgresDBStorage()

export class ReactionFacade {
  async getReactionById(id: string): Promise<Reaction> {
    return await storage.findReactionById(id)
  }

  async createReaction(id: string, idUser: string, reaction: string): Promise<Reaction> {
    return await storage.createReaction(id, idUser, reaction)
  }

  async deleteReaction(id: string): Promise<Reaction> {
    return await storage.deleteReaction(id)
  }
}
