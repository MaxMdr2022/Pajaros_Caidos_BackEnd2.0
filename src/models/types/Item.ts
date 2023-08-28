export type Item = {
  id?: string
  title: string
  description: string
  image: Image[]
  price: number
  createdAt?: Date
  updatedAt?: Date
}
type Image = {
  public_id: string
  secure_url: string
}
