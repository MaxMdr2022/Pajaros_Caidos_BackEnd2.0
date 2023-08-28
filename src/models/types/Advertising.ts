export type Advertising = {
  id?: string
  contact: string
  company: string
  image: Image[]
  createdAt?: Date
  updatedAt?: Date
}
type Image = {
  public_id: string
  secure_url: string
}
