export interface IUserParams {
  id: string
  name: string
  email: string
  phone: string
  address: string
}

export default interface IUser {
  readonly id: string
  readonly name: string
  readonly email: string
  readonly phone: string
  readonly address: string
}
