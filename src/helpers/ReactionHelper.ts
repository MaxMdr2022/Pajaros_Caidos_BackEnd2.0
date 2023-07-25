import { Publication } from 'src/models/types/Publication'
import { ReactionFacade } from '../facades/ReactionFacade'
import { Reaction } from '../models/types/Reaction'
import { User } from 'src/models/types/User'

const facade = new ReactionFacade()

export class ReactionHelper {
  async getReactionById(id: string): Promise<Reaction> {
    return await facade.getReactionById(id)
  }

  async createReaction(publication: Publication, user: User, reaction: string): Promise<Reaction> {
    return await facade.createReaction(publication, user, reaction)
  }

  async deleteReaction(reaction: Reaction): Promise<Reaction> {
    return await facade.deleteReaction(reaction)
  }
}
