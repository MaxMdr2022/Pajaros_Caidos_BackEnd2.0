import { User } from '../models/types/User'
import { PostgresDBStorage } from '../storages/PostgresDBStorage'
import {
  UserListModel,
  PublicationsListModel,
  CommentsListModel,
  ReactionsListModel,
} from '../storages/DB'

const storage = new PostgresDBStorage()

export class UserFacade {
  async getAllUsers(data?: any): Promise<User[]> {
    const { verbose, last_name, pageNumber, userPerPage, userStatus } = data

    const filter: any = {}

    if (verbose) {
      filter.attributes = [
        'id',
        'nick_name',
        'first_name',
        'last_name',
        'avatar',
        'isAdmin',
        'isVoluntary',
        'isBanned',
        'description',
        'contact',
        'email',
      ]
    }

    if (userStatus) {
      filter.where = { [userStatus]: true }
    }

    if (last_name) {
      const nameCapitalWord = last_name.charAt(0).toUpperCase() + last_name.slice(1).toLowerCase()
      filter.where = { last_name: nameCapitalWord }
    }

    if (pageNumber) {
      const skip = (pageNumber - 1) * userPerPage
      filter.order = [['first_name', 'asc']]
      filter.limit = userPerPage
      filter.offset = skip
    }

    return await storage.find(UserListModel, filter)
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
    const user = await storage.find(UserListModel, { where: { email } })

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
