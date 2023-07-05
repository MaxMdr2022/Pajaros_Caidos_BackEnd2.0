export type User = {
  id?: string
  first_name: string
  last_name: string
  nick_name: string
  email: string
  password: string
  avatar: string
  country: string
  city: string
  phone_number: number
  birth_date: Date
  isVoluntary: boolean
  isAdmin: boolean
  isPrincipalAdmin: boolean
  isBanned: boolean
  form_complete: boolean
  createdAt?: Date
  updatedAt?: Date
}
