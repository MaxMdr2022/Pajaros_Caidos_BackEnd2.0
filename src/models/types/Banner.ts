export type Banner = {
  id?: string
  name: string
  image: Image
}
type Image = {
  public_id: string
  secure_url: string
  imageUrl: string
}

export type ResponseBanner = {
  banners: Banner[]
  totalPages?: number
}
