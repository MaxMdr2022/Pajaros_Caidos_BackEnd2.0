import { BirdFacade } from '../facades/BirdFacade'
import { Bird } from '../models/types/Bird'

const facade = new BirdFacade()

export class BirdHelper {
  async getBirdById(id: string): Promise<Bird> {
    return await facade.getBirdById(id)
  }

  async getAllBirds(data?: any): Promise<Bird[]> {
    if (data.location !== undefined) {
      const locationCapitalWord =
        data.location.charAt(0).toUpperCase() + data.location.slice(1).toLowerCase()
      data.location = locationCapitalWord
    }
    if (data.color !== undefined) {
      const colorCapitalWord = data.color.toLowerCase()

      data.color = colorCapitalWord
    }

    return await facade.getAllBirds(data)
  }

  async createBird(data: any): Promise<Bird> {
    const locationCapitalWord = data.location.map(
      (e) => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()
    )
    data.location = locationCapitalWord
    data.color = data.color.toLowerCase()

    return await facade.createBird(data)
  }

  async updateBird(id: string, data: any): Promise<Bird> {
    if (data.location) {
      const locationCapitalWord = data.location.map(
        (e) => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()
      )
      data.location = locationCapitalWord
    }

    if (data.color) {
      data.color = data.color.toLowerCase()
    }

    return await facade.updateBird(id, data)
  }
}
