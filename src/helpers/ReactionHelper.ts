import { ReactionFacade } from '../facades/ReactionFacade'
import { Reaction } from '../models/types/Reaction'

const facade = new ReactionFacade()

export class ReactionHelper {
  async getReactionById(id: string): Promise<Reaction> {
    return await facade.getReactionById(id)
  }

  async createReaction(id: string, idUser: string, reaction: string): Promise<Reaction> {
    return await facade.createReaction(id, idUser, reaction)
  }

  async deleteReaction(id: string): Promise<Reaction> {
    return await facade.deleteReaction(id)
  }
}
