export type Publication = {
  id?: string
  title: string
  description: string
  image: Image[]
  isDeleted: boolean
  createdAt?: Date
  updatedAt?: Date
}
type Image = {
  public_id: string
  secure_url: string
}
