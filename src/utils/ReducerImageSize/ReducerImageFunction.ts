import sharp from 'sharp'
import { UploadedFile } from 'express-fileupload'

export const reducerImageSize = async (imagePaths: UploadedFile | UploadedFile[] | undefined) => {
  const MAX_IMAGE_SIZE_BYTES = 550 * 1024 // 550kb

  try {
    if (!Array.isArray(imagePaths)) {
      const imageInfo = await sharp(imagePaths.tempFilePath).metadata()
      console.log('not array size: ', imageInfo.size)

      if (imageInfo.size > MAX_IMAGE_SIZE_BYTES) {
        console.log('entro not a')

        const outputImageBuffer: Buffer | UploadedFile = await sharp(imagePaths.tempFilePath)
          .resize({ width: 800 })
          .jpeg({ quality: 60 })
          .toBuffer()

        return outputImageBuffer
      } else {
        return imagePaths
      }
    } else {
      const compressedImages: (Buffer | UploadedFile)[] = await Promise.all(
        imagePaths.map(async (imagePath) => {
          const imageInfo = await sharp(imagePath.tempFilePath).metadata()
          console.log('array size: ', imageInfo.size)

          if (imageInfo.size > MAX_IMAGE_SIZE_BYTES) {
            console.log('entro a')

            const outputImageBuffer = await sharp(imagePath.tempFilePath)
              .resize({ width: 800 })
              .jpeg({ quality: 60 })
              .toBuffer()

            return outputImageBuffer
          } else {
            return imagePath
          }
        })
      )

      return compressedImages
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
