import { MySQLDBStorage } from '../storages/MySQLDBStorage'
import { AdvertisingListModel } from '../storages/DB'
import { Advertising } from '../models/types/Advertising'

const storage = new MySQLDBStorage()

export class AdvertisingFacade {
  async getAdvertisingById(id: string): Promise<Advertising> {
    return await storage.findById(AdvertisingListModel, id)
  }

  async getAllAdvertising(filters?: any): Promise<Advertising> {
    const { pageNumber, advertisingPerPage } = filters

    const filter: any = {}

    if (pageNumber) {
      const skip = (pageNumber - 1) * advertisingPerPage
      filter.order = [['createdAt', 'asc']]
      filter.limit = advertisingPerPage
      filter.offset = skip
    }

    return await storage.find(AdvertisingListModel, filter)
  }

  async createAdvertising(data: Advertising): Promise<Advertising> {
    return await storage.create(AdvertisingListModel, data)
  }

  async updateAdvertising(id: string, data: any): Promise<Advertising> {
    return await storage.update(AdvertisingListModel, { ...data }, { where: { id } })
  }

  async deleteAdvertising(id: string): Promise<Advertising> {
    return await storage.delete(AdvertisingListModel, { where: { id } })
  }
}
