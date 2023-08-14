import { Banner } from './Banner'

export type News = {
  id?: string
  title: string
  description: string
  image: string[]
  // isDeleted?:boolean
  createdAt?: Date
  updatedAt?: Date
}

export type Response = {
  news: News[]
  totalPages?: number
  banner?: Banner[]
}
