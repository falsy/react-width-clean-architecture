import { IsString } from "class-validator"
import IFranchiseDTO, { IFranchiseDTOParams } from "./interfaces/IFranchiseDTO"

export default class FranchiseDTO implements IFranchiseDTO {
  @IsString()
  readonly id: string

  @IsString()
  readonly name: string

  @IsString()
  readonly address: string

  @IsString()
  readonly brand: string

  constructor(params: IFranchiseDTOParams) {
    this.id = params.id
    this.name = params.name
    this.address = params.address
    this.brand = params.brand
  }
}
