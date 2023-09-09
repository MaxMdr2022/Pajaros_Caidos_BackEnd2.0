export type User = {
  id?: string
  first_name: string
  last_name: string
  nick_name: string
  email: string
  password: string
  avatar: Image
  country: string
  province: string
  city: string
  phone_number: number
  description: string
  contact: string
  emailValidateCode?: string
  birth_date: Date
  age: number
  isVoluntary: boolean
  isAdmin: boolean
  isPrincipalAdmin: boolean
  isBanned: boolean
  userEmailValidate: boolean
  form_complete: boolean
  registerWithAuth0: boolean
  createdAt?: Date
  updatedAt?: Date
}
type Image = {
  public_id: string
  secure_url: string
}
