import sharp from 'sharp'
import { UploadedFile } from 'express-fileupload'
import fs from 'fs'

export const reducerImageSize = async (image: UploadedFile | UploadedFile[] | undefined) => {
  const MAX_IMAGE_SIZE_BYTES = 550 * 1024 // 550kb

  try {
    if (!Array.isArray(image)) {
      const imageInfo = await sharp(image.tempFilePath).metadata()
      console.log('image: ', image.tempFilePath)
      console.log('image info; ', imageInfo)

      console.log('not array size: ', imageInfo.size)

      if (true) {
        console.log('entro not a')

        const outputImageBuffer = await sharp(image.tempFilePath)
          .resize({ width: 800 })
          .jpeg({ quality: 60 })
          .toBuffer()

        fs.writeFileSync(image.tempFilePath, outputImageBuffer)

        return image
      } else {
        return image
      }
    } else {
      const compressedImages = await Promise.all(
        image.map(async (img) => {
          const imageInfo = await sharp(img.tempFilePath).metadata()
          console.log('array size: ', imageInfo.size)

          if (imageInfo.size > MAX_IMAGE_SIZE_BYTES) {
            console.log('entro a')

            const outputImageBuffer = await sharp(img.tempFilePath)
              .resize({ width: 800 })
              .jpeg({ quality: 60 })
              .toBuffer()

            fs.writeFileSync(img.tempFilePath, outputImageBuffer)
          } else {
            return img
          }
        })
      )

      return image
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
