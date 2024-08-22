import IUser, { IUserParams } from "./interfaces/IUser"

export default class User implements IUser {
  readonly id: string
  name: string
  email: string
  phone: string
  address: string

  constructor(params: IUserParams) {
    this.id = params.id
    this.name = params.name
    this.email = params.email
    this.phone = params.phone
    this.address = params.address
  }
}
