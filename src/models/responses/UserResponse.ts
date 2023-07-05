export type QueryResponse = {
  users: UsersQuery[]
}
export type UsersQuery = {
  id: string
  nick_name: string
  isAdmin: boolean
  isVoluntary: boolean
  isBanned: boolean
}
