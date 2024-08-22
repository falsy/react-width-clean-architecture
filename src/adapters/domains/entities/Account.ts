import IAccount, { IAccountParams } from "./interfaces/IAccount"

export default class Account implements IAccount {
  readonly id: string
  readonly accountType: "SAVINGS" | "CURRENT"
  readonly bankName: string
  readonly accountNumber: string
  readonly balance: number

  constructor(params: IAccountParams) {
    this.id = params.id
    this.accountType = params.accountType
    this.bankName = params.bankName
    this.accountNumber = params.accountNumber
    this.balance = params.balance
  }
}
