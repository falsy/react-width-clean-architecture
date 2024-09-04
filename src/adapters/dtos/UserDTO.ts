import { IsEmail, IsString } from "class-validator"
import IUserDTO, { IUserDTOParams } from "./interfaces/IUserDTO"

export default class UserDTO implements IUserDTO {
  @IsString()
  readonly id: string

  @IsString()
  readonly name: string

  @IsEmail()
  readonly email: string

  @IsString()
  readonly phone: string

  @IsString()
  readonly address: string

  constructor(params: IUserDTOParams) {
    this.id = params.id
    this.name = params.name
    this.email = params.email
    this.phone = params.phone
    this.address = params.address
  }
}
