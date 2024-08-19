import { ValidateNested } from "class-validator"
import Transaction from "./Transaction"
import IAccount from "../entities/interfaces/IAccount"
import { IAccountTransactionParams } from "./interfaces/IAccountTransaction"

export default class AccountTransaction extends Transaction {
  @ValidateNested()
  readonly account: IAccount

  constructor(params: IAccountTransactionParams) {
    super(params)
    this.account = params.account
  }
}
