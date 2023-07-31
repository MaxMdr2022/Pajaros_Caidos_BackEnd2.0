import { AdvertisingFacade } from '../facades/AdvertisingFacade'
import { Advertising } from '../models/types/Advertising'

const facade = new AdvertisingFacade()

export class AdvertisingHelper {
  async getAdvertisingById(id: string): Promise<Advertising> {
    return await facade.getAdvertisingById(id)
  }

  async getAllAdvertising(data?: any): Promise<Advertising> {
    return await facade.getAllAdvertising(data)
  }

  async createAdvertising(data: Advertising): Promise<Advertising> {
    return await facade.createAdvertising(data)
  }

  async updateAdvertising(id: string, data: any): Promise<Advertising> {
    return await facade.updateAdvertising(id, data)
  }

  async deleteAdvertising(id: string): Promise<Advertising> {
    return await facade.deleteAdvertising(id)
  }
}
