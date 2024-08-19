import { IsString } from "class-validator"
import IUser, { IUserParams } from "./interfaces/IUser"

export default class User implements IUser {
  @IsString()
  readonly id: string

  @IsString()
  name: string

  @IsString()
  email: string

  @IsString()
  phone: string

  @IsString()
  address: string

  constructor(params: IUserParams) {
    this.id = params.id
    this.name = params.name
    this.email = params.email
    this.phone = params.phone
    this.address = params.address
  }
}
