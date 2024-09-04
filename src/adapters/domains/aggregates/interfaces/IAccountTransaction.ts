import IAccountInfoVO from "adapters/domains/vos/interfaces/IAccountInfoVO"
import IAccount from "../../entities/interfaces/IAccount"
import ITransaction from "../entities/interfaces/ITransaction"

export interface IAccountTransactionParams {
  transaction: ITransaction
  account: IAccount
}

export default interface IAccountTransaction extends ITransaction {
  readonly account: IAccountInfoVO
}
