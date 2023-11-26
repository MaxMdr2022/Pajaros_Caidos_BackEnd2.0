import { AdvertisingFacade } from '../facades/AdvertisingFacade'
import { Advertising } from '../models/types/Advertising'
import { deleteImage } from '../utils/cloudinary/Cloudinary'

const facade = new AdvertisingFacade()

export class AdvertisingHelper {
  async getAdvertisingById(id: string): Promise<Advertising> {
    return await facade.getAdvertisingById(id)
  }

  async getAllAdvertising(data?: any): Promise<Advertising[]> {
    const advertising: Advertising[] = await facade.getAllAdvertising(data)
    if (!advertising || !advertising[0]) return []

    return advertising
  }

  async createAdvertising(data: Advertising): Promise<Advertising> {
    return await facade.createAdvertising(data)
  }

  async updateAdvertising(id: string, advertising: Advertising, data: any): Promise<Advertising> {
    const { newImages, deleteImages, ...dataUpdated } = data

    const image = advertising.image
    dataUpdated.image = image

    if (deleteImages && deleteImages[0]) {
      const imageNoDeleted = image.filter((e) => !deleteImages.find((el) => e.public_id === el))

      dataUpdated.image = imageNoDeleted

      for (const img of deleteImages) {
        await deleteImage(img)
      }
    }

    if (newImages && newImages[0]) {
      const updatedImages = [...dataUpdated.image, ...newImages]
      dataUpdated.image = updatedImages
    }
    return await facade.updateAdvertising(id, dataUpdated)
  }

  async deleteAdvertising(id: string, advertising: Advertising): Promise<Advertising> {
    for (const img of advertising.image) {
      await deleteImage(img.public_id)
    }
    return await facade.deleteAdvertising(id)
  }
}
