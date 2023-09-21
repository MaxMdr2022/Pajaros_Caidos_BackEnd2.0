import axios from 'axios'
import { LRUCache } from 'lru-cache'

// tiene el  máximo  a 100 elementos.
const cache = new LRUCache({ max: 100 })

export async function getImageFromCacheOrCloudinary(imageUrl: string): Promise<Buffer | string> {
  // chequea q la imagen este en caché.
  const cachedImage = cache.get(imageUrl) as Buffer | undefined

  if (cachedImage) {
    console.log('Imagen obtenida desde caché.')
    return cachedImage
  } else {
    // Si la imagen no está en caché, realiza una solicitud a Cloudinary
    try {
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })

      // Guarda la imagen en caché
      cache.set(imageUrl, Buffer.from(response.data))

      console.log('Imagen obtenida desde Cloudinary y guardada en caché.')

      return Buffer.from(response.data)
    } catch (error) {
      return 'Error al obtener la imagen desde Cloudinary: ' + error.message
    }
  }
}
