import { Publication } from '../models/types/Publication'
import { PostgresDBStorage } from '../storages/PostgresDBStorage'
import {
  PublicationsListModel,
  UserListModel,
  CommentsListModel,
  ReactionsListModel,
} from '../storages/DB'

const storage = new PostgresDBStorage()

export class PublicationFacade {
  async countPublications(): Promise<number> {
    return await storage.count(PublicationsListModel)
  }

  async createPublication(userId: string, data: any): Promise<Publication> {
    const newPublication: Publication = await storage.create(PublicationsListModel, data)

    const user = await storage.findById(UserListModel, userId)

    await storage.relationship(user, 'addPublication', newPublication)

    return newPublication
  }

  async getAllPublications(data?: any): Promise<Publication[]> {
    const { limit, title, postPerPage, pageNumber, limitComments, orderCreate } = data

    const filter: any = {
      include: [
        {
          model: UserListModel,
          attributes: ['id', 'avatar', 'nick_name'],
        },
        {
          model: CommentsListModel,
          order: [['createdAt', 'DESC']],
          limit: limitComments ? limitComments : 2,
          include: [
            {
              model: UserListModel,
              attributes: ['nick_name'],
            },
          ],
        },
        {
          model: ReactionsListModel,
        },
      ],
    }

    if (title) {
      filter.where = { title }
    }

    if (pageNumber) {
      const skip = (pageNumber - 1) * postPerPage
      filter.order = [['createdAt', orderCreate]]
      filter.limit = postPerPage
      filter.offset = skip
    }

    return await storage.find(PublicationsListModel, filter)
  }

  async getPublicationById(id: string): Promise<Publication> {
    const filter: any = {
      include: [
        {
          model: UserListModel,
          attributes: ['id', 'avatar', 'nick_name'],
        },
        {
          model: CommentsListModel,
          order: [['createdAt', 'ASC']],
          include: [
            {
              model: UserListModel,
              attributes: ['nick_name'],
            },
          ],
        },
        {
          model: ReactionsListModel,
        },
      ],
    }

    return await storage.findById(PublicationsListModel, id, filter)
  }

  async updatePublication(id: string, data: any): Promise<Publication> {
    return await storage.update(PublicationsListModel, { ...data }, { where: { id } })
  }

  async deletePublication(id: string): Promise<Publication> {
    const filter: any = { where: { publicationId: id } }

    await storage.delete(CommentsListModel, filter)
    await storage.delete(ReactionsListModel, filter)

    return await storage.delete(PublicationsListModel, { where: { id } })
  }
}
