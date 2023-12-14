import { User } from '../models/types/User'
import { MySQLDBStorage } from '../storages/MySQLDBStorage'
import {
  UserListModel,
  PublicationsListModel,
  CommentsListModel,
  ReactionsListModel,
} from '../storages/DB'

const storage = new MySQLDBStorage()

export class UserFacade {
  async countUsers(filter?: any): Promise<number> {
    return await storage.count(UserListModel, filter)
  }

  async getAllUsers(data?: any, get?: boolean): Promise<User[]> {
    const { verbose, last_name, pageNumber, userPerPage, userStatus, voluntaryType } = data

    const filter: any = {
      attributes: {
        exclude: ['password'],
      },
    }

    if (verbose) {
      filter.attributes = [
        'id',
        'nick_name',
        'first_name',
        'last_name',
        'avatar',
        'isAdmin',
        'isVoluntary',
        'voluntaryType',
        'isBanned',
        'description',
        'contact',
        'email',
      ]
    }

    if (userStatus) {
      filter.where = { [userStatus]: true }
      filter.attributes = [
        'id',
        'nick_name',
        'first_name',
        'last_name',
        'avatar',
        'voluntaryType',
        'isDeveloper',
        'isVoluntary',
        'description',
        'contact',
      ]
    }

    if (voluntaryType) {
      filter.where.voluntaryType = voluntaryType
    }

    if (last_name) {
      const nameCapitalWord = last_name.charAt(0).toUpperCase() + last_name.slice(1).toLowerCase()
      filter.where = { last_name: nameCapitalWord }
    }

    if (pageNumber) {
      const skip = (pageNumber - 1) * userPerPage
      filter.order = [['first_name', 'asc']]
      filter.limit = parseInt(userPerPage, 10)
      filter.offset = skip
    }

    return await storage.find(UserListModel, filter, get)
  }

  async getUserById(id: string, filter?: string): Promise<User> {
    const object: any = {}

    if (filter === 'all') {
      object.include = [
        {
          model: PublicationsListModel,
        },
        {
          model: CommentsListModel,
        },
        {
          model: ReactionsListModel,
        },
      ]
    }

    if (filter === 'publications') {
      object.include = [
        {
          model: PublicationsListModel,
          include: [
            {
              model: CommentsListModel,
            },
            {
              model: ReactionsListModel,
            },
          ],
        },
      ]
    }

    if (filter === 'comments') {
      object.include = [
        {
          model: CommentsListModel,
        },
      ]
    }

    return await storage.findById(UserListModel, id, object)
  }
  async getUserByEmail(email: string): Promise<User> {
    const user = await storage.find(UserListModel, {
      // attributes: {
      //   exclude: ['password'],
      // },
      where: { email },
    })

    if (!user || !user[0]) return null

    return user[0]
  }

  async checkNickName(nick: string): Promise<boolean> {
    const nick_name = await storage.find(UserListModel, { where: { nick_name: nick } })

    if (!nick_name || !nick_name[0]) return false

    return !!nick_name
  }

  async createUser(data: any): Promise<User> {
    return await storage.create(UserListModel, data)
  }

  async updateUser(id: string, data: any): Promise<User> {
    return await storage.update(UserListModel, { ...data }, { where: { id } })
  }
}
