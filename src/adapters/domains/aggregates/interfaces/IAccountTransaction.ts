import ITransaction, { ITransactionParams } from "./ITransaction"
import IAccount from "../../entities/interfaces/IAccount"

export interface IAccountTransactionParams extends ITransactionParams {
  account: IAccount
}

export default interface IAccountTransaction extends ITransaction {
  account: IAccount
}
