import { IsEmail, IsString } from "class-validator"
import IUserInfoDTO, { IUserInfoDTOParams } from "./interfaces/IUserInfoDTO"

export default class UserInfoDTO implements IUserInfoDTO {
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

  constructor(params: IUserInfoDTOParams) {
    this.id = params.id
    this.name = params.name
    this.email = params.email
    this.phone = params.phone
    this.address = params.address
  }
}
