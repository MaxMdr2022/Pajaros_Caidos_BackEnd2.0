import { Publication } from '../models/types/Publication'
import { MySQLDBStorage } from '../storages/MySQLDBStorage'
import {
  PublicationsListModel,
  UserListModel,
  CommentsListModel,
  ReactionsListModel,
} from '../storages/DB'
import { Op, Sequelize as sequelize } from 'sequelize'

const storage = new MySQLDBStorage()

export class PublicationFacade {
  async countPublications(): Promise<number> {
    return await storage.count(PublicationsListModel)
  }

  async QuantityComments(idPost: string): Promise<number> {
    const result = await storage.count(CommentsListModel, { where: { publicationId: idPost } })

    return result
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
        filterDB.attributes = [
          'id',
          'title',
          'description',
          'image',
          'isDeleted',
          'createdAt',
          'updatedAt',
          'userId',
          [
            sequelize.literal(
              '(SELECT COUNT(*) FROM `reactions` WHERE `reactions`.`publicationId` = `publication`.`id`)'
            ),
            'reactionsCount',
          ],
        ]
        filterDB.order = [[sequelize.literal('reactionsCount'), 'DESC']]
      } else {
        filterDB.where = {
          createdAt: {
            [Op.between]: [filter, currentDate],
          },
        }

        filterDB.order = [['createdAt', 'asc']]
      }

      filterDB.limit = parseInt(limit, 10)
    } else {
      filterDB.include = [
        {
          model: UserListModel,
          attributes: ['id', 'avatar', 'nick_name', 'isVoluntary', 'isAdmin'],
        },
        {
          model: CommentsListModel,
          order: [['createdAt', 'DESC']],
          limit: parseInt(limitComments, 10) ? parseInt(limitComments, 10) : null,
          include: [
            {
              model: UserListModel,
              attributes: ['nick_name', 'avatar', 'isVoluntary', 'isAdmin'],
            },
          ],
        },
        {
          model: ReactionsListModel,
          include: [
            {
              model: UserListModel,
              attributes: ['nick_name'],
            },
          ],
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

      filterDB.limit = parseInt(postPerPage, 10)
      filterDB.offset = skip
    }

    const publications: Publication[] = await storage.find(PublicationsListModel, filterDB)

    return publications
  }

  async getPublicationById(id: string): Promise<Publication> {
    const filter: any = {
      include: [
        {
          model: UserListModel,
          attributes: ['id', 'avatar', 'nick_name', 'isVoluntary', 'isAdmin'],
        },
        {
          model: CommentsListModel,
          order: [['createdAt', 'ASC']],
          include: [
            {
              model: UserListModel,
              attributes: ['nick_name', 'avatar', 'isVoluntary', 'isAdmin'],
            },
          ],
        },
        {
          model: ReactionsListModel,
          include: [
            {
              model: UserListModel,
              attributes: ['nick_name'],
            },
          ],
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
