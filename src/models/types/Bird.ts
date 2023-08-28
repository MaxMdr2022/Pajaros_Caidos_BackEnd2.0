export type Bird = {
  id?: string
  name: string
  scientificName: string
  image: Image[]
  location: string[]
  size: string
  color: string
  description: string
  createdAt?: Date
  updatedAt?: Date
}
type Image = {
  public_id: string
  secure_url: string
}
