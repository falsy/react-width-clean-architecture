import { IsNumber, IsString } from "class-validator"
import IAccount from "../entities/interfaces/IAccount"
import IAccountInfoVO from "./interfaces/IAccountInfoVO"

export default class AccountInfoVO implements IAccountInfoVO {
  @IsString()
  readonly accountType: "SAVINGS" | "CURRENT"

  @IsString()
  readonly bankName: string

  @IsString()
  readonly accountNumber: string

  @IsNumber()
  readonly balance: number

  constructor(params: IAccount) {
    this.accountType = params.accountType
    this.bankName = params.bankName
    this.accountNumber = params.accountNumber
    this.balance = params.balance
  }
}
