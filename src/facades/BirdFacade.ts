import { MySQLDBStorage } from '../storages/MySQLDBStorage'
import { Bird } from '../models/types/Bird'
import { BirdsListModel } from '../storages/DB'
import { Op } from 'sequelize'

const storage = new MySQLDBStorage()

export class BirdFacade {
  async getBirdById(id: string): Promise<Bird> {
    return await storage.findById(BirdsListModel, id)
  }

  async getAllBirds(data?: any): Promise<Bird[]> {
    const { location, color, pageNumber, birdPerPage, name } = data

    const filter: any = {}

    if (name) {
      filter.where = { name }
    }

    if (location) {
      filter.where = { location: { [Op.contains]: [location] } }
    }

    if (color) {
      filter.where = { color: { [Op.eq]: color } }
    }

    if (pageNumber) {
      const skip = (pageNumber - 1) * birdPerPage
      filter.order = [['name', 'asc']]
      filter.limit = birdPerPage
      filter.offset = skip
    }

    return await storage.find(BirdsListModel, filter)
  }

  async createBird(data: any): Promise<Bird> {
    return await storage.create(BirdsListModel, data)
  }

  async updateBird(id: string, data: any): Promise<Bird> {
    return await storage.update(BirdsListModel, { ...data }, { where: { id } })
  }
}
