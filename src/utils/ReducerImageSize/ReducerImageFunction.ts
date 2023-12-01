import sharp from 'sharp'
import { UploadedFile } from 'express-fileupload'
import fs from 'fs'

export const reducerImageSize = async (image: UploadedFile | UploadedFile[] | undefined) => {
  const MAX_IMAGE_SIZE_BYTES = 250 * 1024 // 250kb

  try {
    if (!Array.isArray(image)) {
      const imageInfo = await sharp(image.tempFilePath).metadata()

      //si metadata() no consigue el tamaño de la imagen la busco con la sig func
      let imageSize = 0
      if (imageInfo && imageInfo.size === undefined) {
        imageSize = await getFileSize(image.tempFilePath)
      }

      if (
        (imageInfo && imageInfo.size > MAX_IMAGE_SIZE_BYTES) ||
        imageSize > MAX_IMAGE_SIZE_BYTES
      ) {
        const outputImageBuffer = await sharp(image.tempFilePath)
          .resize({ width: 800 })
          .jpeg({ quality: 60 })
          .toBuffer()

        //piso la imagen vieja con la imagen comprimida en la carpeta temporal

        fs.writeFileSync(image.tempFilePath, outputImageBuffer)

        //y le paso la imagen para que updatedImage tome el path de la imagen en temp y suba la imagen comprimida
        return image
      } else {
        return image
      }
    } else {
      //aca hacemos lo mismo pero recorriendo el arreglo si son varias img
      const compressedImages = await Promise.all(
        image.map(async (img) => {
          const imageInfo = await sharp(img.tempFilePath).metadata()

          let imageSize = 0
          if (imageInfo && imageInfo.size === undefined) {
            imageSize = await getFileSize(img.tempFilePath)
          }

          if (
            (imageInfo && imageInfo.size > MAX_IMAGE_SIZE_BYTES) ||
            imageSize > MAX_IMAGE_SIZE_BYTES
          ) {
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

const getFileSize = async (filePath) => {
  try {
    const stats = await fs.promises.stat(filePath)

    return stats.size
  } catch (error) {
    console.error('Error getting file size:', error)
    return null
  }
}
