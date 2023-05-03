type TRole = 'USER' | 'MANAGER'

export interface IUser {
  email?: string
  exp?: number
  iat?: number
  id?: number
  role?: TRole
  name?: string
  surname?: string
  lastname?: string
}
