import IAccount from "../../entities/interfaces/IAccount"
import ITransaction from "../entities/interfaces/ITransaction"

export interface IAccountTransactionParams {
  transaction: ITransaction
  account: IAccount
}

export default interface IAccountTransaction {
  readonly transaction: ITransaction
  readonly account: IAccount
}
