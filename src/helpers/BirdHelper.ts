import { BirdFacade } from '../facades/BirdFacade'
import { Bird } from '../models/types/Bird'

const facade = new BirdFacade()

export class BirdHelper {
  async getBirdById(id: string): Promise<Bird> {
    return await facade.getBirdById(id)
  }

  async getAllBirds(limit?: number, location?: string, color?: string): Promise<Bird[]> {
    let filter: any = {}

    if (location !== undefined) {
      const locationCapitalWord = location.charAt(0).toUpperCase() + location.slice(1).toLowerCase()
      filter.location = locationCapitalWord
    }
    if (color !== undefined) {
      const colorCapitalWord = color.toLowerCase()

      filter.color = colorCapitalWord
    }

    return await facade.getAllBirds(limit, filter)
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
