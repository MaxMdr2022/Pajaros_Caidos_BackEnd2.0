import { Banner } from './Banner'

export type News = {
  id?: string
  title: string
  description: string
  image: Image[]
  // isDeleted?:boolean
  createdAt?: Date
  updatedAt?: Date
}

type Image = {
  public_id: string
  secure_url: string
  imageUrl: string
}

export type Response = {
  news: News[]
  totalPages?: number
  banner?: Banner[]
}
