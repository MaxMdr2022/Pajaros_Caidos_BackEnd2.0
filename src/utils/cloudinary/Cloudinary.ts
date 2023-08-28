import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export async function uploadImage(filePath: any, folder: string) {
  const response = await cloudinary.uploader.upload(filePath, { folder })
  return response
}

export async function deleteImage(public_id: string) {
  const response = await cloudinary.uploader.destroy(public_id)
  return response
}
