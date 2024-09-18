import IAccount from "../entities/interfaces/IAccount"
import IAccountInfoVO from "./interfaces/IAccountInfoVO"

export default class AccountInfoVO implements IAccountInfoVO {
  readonly accountType: "SAVINGS" | "CURRENT"
  readonly bankName: string
  readonly accountNumber: string
  readonly balance: number

  constructor(params: IAccount) {
    this.accountType = params.accountType
    this.bankName = params.bankName
    this.accountNumber = params.accountNumber
    this.balance = params.balance
  }
}
