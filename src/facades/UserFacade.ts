import { User } from '../models/types/User'
import { PostgresDBStorage } from '../storages/PostgresDBStorage'

const storage = new PostgresDBStorage()

export class UserFacade {
  async getAllUsers(): Promise<User[]> {
    return await storage.find()
  }

  async getUserById(id: string, filter?: string): Promise<User> {
    return await storage.findById(id, filter)
  }
  async getUserByEmail(email: string): Promise<User> {
    return await storage.findUserByEmail(email)
  }

  async checkNickName(nick: string): Promise<boolean> {
    return await storage.findNickName(nick)
  }

  async createUser(data: any): Promise<User> {
    return await storage.createUser(data)
  }

  async updateUser(id: string, data: any): Promise<User> {
    return await storage.updateUser(id, data)
  }
}
