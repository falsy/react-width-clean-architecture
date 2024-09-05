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

  @IsString()
  readonly branch: string

  @IsString()
  readonly createdAt: string

  constructor(params: IAccountDTOParams) {
    this.id = params.id
    this.accountType = params.account_type
    this.bankName = params.bank_name
    this.accountNumber = params.account_number
    this.balance = params.balance
    this.branch = params.branch
    this.createdAt = params.created_at
  }
}
