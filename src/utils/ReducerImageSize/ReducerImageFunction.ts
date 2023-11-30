import sharp from 'sharp'
import { UploadedFile } from 'express-fileupload'

export const reducerImageSize = async (imagePaths: UploadedFile | UploadedFile[] | undefined) => {
  const MAX_IMAGE_SIZE_BYTES = 3 * 1024 * 1024 // 3 MB

  try {
    if (!Array.isArray(imagePaths)) {
      const imageInfo = await sharp(imagePaths.tempFilePath).metadata()

      if (imageInfo.size > MAX_IMAGE_SIZE_BYTES) {
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

          if (imageInfo.size > MAX_IMAGE_SIZE_BYTES) {
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
