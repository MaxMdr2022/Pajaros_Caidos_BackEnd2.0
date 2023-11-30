import sharp from 'sharp'
import { UploadedFile } from 'express-fileupload'

export const reducerImageSize = async (image: UploadedFile | UploadedFile[] | undefined) => {
  const MAX_IMAGE_SIZE_BYTES = 550 * 1024 // 550kb

  try {
    if (!Array.isArray(image)) {
      const imageInfo = await sharp(image.tempFilePath).metadata()
      console.log('image: ', image.tempFilePath)
      console.log('image info; ', imageInfo)

      console.log('not array size: ', imageInfo.size)

      if (imageInfo.size > MAX_IMAGE_SIZE_BYTES) {
        console.log('entro not a')

        const outputImageBuffer: Buffer | UploadedFile = await sharp(image.tempFilePath)
          .resize({ width: 800 })
          .jpeg({ quality: 60 })
          .toBuffer()

        return outputImageBuffer
      } else {
        return image
      }
    } else {
      const compressedImages: (Buffer | UploadedFile)[] = await Promise.all(
        image.map(async (img) => {
          const imageInfo = await sharp(img.tempFilePath).metadata()
          console.log('array size: ', imageInfo.size)

          if (imageInfo.size > MAX_IMAGE_SIZE_BYTES) {
            console.log('entro a')

            const outputImageBuffer = await sharp(img.tempFilePath)
              .resize({ width: 800 })
              .jpeg({ quality: 60 })
              .toBuffer()

            return outputImageBuffer
          } else {
            return img
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
