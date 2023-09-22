import { Publication } from '../models/types/Publication'
import { PostgresDBStorage } from '../storages/PostgresDBStorage'
import {
  PublicationsListModel,
  UserListModel,
  CommentsListModel,
  ReactionsListModel,
} from '../storages/DB'
import { Op, Sequelize as sequelize } from 'sequelize'

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
    const {
      limit,
      title,
      postPerPage,
      pageNumber,
      limitComments,
      orderCreate,
      currentDate,
      filter,
    } = data

    const filterDB: any = {}

    if (filter) {
      filterDB.include = [
        {
          model: UserListModel,
          attributes: ['id', 'avatar', 'nick_name'],
        },
      ]

      if (filter === 'likes') {
        filterDB.include.push({
          model: ReactionsListModel,
          attributes: [],
          include: [],
        })

        filterDB.order = [
          [
            sequelize.literal(
              '(SELECT COUNT(*) FROM "reactions" WHERE "reactions"."publicationId" = "publication"."id")'
            ),
            'DESC',
          ],
        ]
      } else {
        filterDB.where = {
          createdAt: {
            [Op.between]: [filter, currentDate],
          },
        }

        filterDB.order = [['createdAt', 'asc']]
      }

      filterDB.limit = limit
    } else {
      filterDB.include = [
        {
          model: UserListModel,
          attributes: ['id', 'avatar', 'nick_name'],
        },
        {
          model: CommentsListModel,
          order: [['createdAt', 'DESC']],
          limit: limitComments ? limitComments : null,
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
      ]
    }

    if (title) {
      filterDB.where = { title }
    }

    if (pageNumber) {
      const skip = (pageNumber - 1) * postPerPage
      if (!orderCreate) {
        filterDB.order = [['createdAt', 'desc']]
      } else {
        filterDB.order = [['createdAt', orderCreate]]
      }

      filterDB.limit = postPerPage
      filterDB.offset = skip
    }

    return await storage.find(PublicationsListModel, filterDB)
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
