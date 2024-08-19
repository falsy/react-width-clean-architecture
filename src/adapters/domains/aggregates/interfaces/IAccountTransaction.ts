import ITransaction, { ITransactionParams } from "./ITransaction"
import IAccount from "../../entities/interfaces/IAccount"
import IAccountInfoVO from "adapters/domains/vos/interfaces/IAccountInfoVO"

export interface IAccountTransactionParams extends ITransactionParams {
  account: IAccount
}

export default interface IAccountTransaction extends ITransaction {
  readonly account: IAccountInfoVO
  readonly accountId: string
}
