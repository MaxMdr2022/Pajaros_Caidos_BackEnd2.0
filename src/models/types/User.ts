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
  description: string
  contact: string
  emailValidateCode?: string
  birth_date: Date
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
