import { IsNumber, IsString } from "class-validator"
import IAccountDTO, { IAccountDTOParams } from "./interfaces/IAccountDTO"

export default class AccountDTO implements IAccountDTO {
  @IsString()
  readonly id: string

  @IsString()
  readonly accountType: "SAVINGS" | "CURRENT"

  @IsString()
  readonly bankName: string

  @IsString()
  readonly accountNumber: string

  @IsNumber()
  readonly balance: number

  constructor(params: IAccountDTOParams) {
    this.id = params.id
    this.accountType = params.accountType
    this.bankName = params.bankName
    this.accountNumber = params.accountNumber
    this.balance = params.balance
  }
}
