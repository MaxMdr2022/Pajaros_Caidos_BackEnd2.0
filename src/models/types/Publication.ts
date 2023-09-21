import { User } from './User'

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
  imageUrl: string
}

export type PublicationAndUser = Pick<
  Publication,
  'id' | 'title' | 'description' | 'image' | 'isDeleted' | 'createdAt' | 'updatedAt'
> & {
  user?: User
}
