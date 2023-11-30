import { uploadImage } from './Cloudinary'
import fs from 'fs-extra'
import { UploadedFile } from 'express-fileupload'

export const uploadImg = async (image: Buffer | Buffer[], file: string) => {
  const data = []

  if (!Array.isArray(image)) {
    // Si image no es un array, asumimos que es un solo UploadedFile
    const response = await uploadImage(image, file)

    if (!response) {
      const message = 'Error Cloudinary response'
      return message
    }

    data.push({ public_id: response.public_id, secure_url: response.secure_url })

    await fs.unlink(image) // eliminamos la imagen que se guardo en el servidor
  } else {
    // Si image es un array, asumimos que es un array de UploadedFile
    for (const img of image) {
      const response = await uploadImage(img, file)
      if (!response) {
        const message = 'Error Cloudinary response'
        return message
      }

      data.push({ public_id: response.public_id, secure_url: response.secure_url })
      await fs.unlink(img)
    }
  }

  return data
}
