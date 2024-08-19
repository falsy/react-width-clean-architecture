import { IsNumber, IsString } from "class-validator"
import IAccount, { IAccountParams } from "./interfaces/IAccount"

export default class Account implements IAccount {
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

  constructor(params: IAccountParams) {
    this.id = params.id
    this.accountType = params.accountType
    this.bankName = params.bankName
    this.accountNumber = params.accountNumber
    this.balance = params.balance
  }
}
