import { MySQLDBStorage } from '../storages/MySQLDBStorage'
import { Reaction } from '../models/types/Reaction'
import { ReactionsListModel } from '../storages/DB'
import { Publication } from '../models/types/Publication'
import { User } from '../models/types/User'

const storage = new MySQLDBStorage()

export class ReactionFacade {
  async getReactionById(id: string): Promise<Reaction> {
    return await storage.findById(ReactionsListModel, id)
  }

  async createReaction(publication: Publication, user: User, reaction: string): Promise<Reaction> {
    const newReaction: Reaction = await storage.create(ReactionsListModel, { reaction })

    await storage.relationship(user, 'addReaction', newReaction)
    await storage.relationship(publication, 'addReaction', newReaction)

    return newReaction
  }

  async deleteReaction(reaction: any): Promise<Reaction> {
    const filter: any = {
      where: {
        id: reaction.id,
        userId: reaction.userId,
        publicationId: reaction.publicationId,
      },
    }
    return await storage.delete(ReactionsListModel, filter)
  }
}
