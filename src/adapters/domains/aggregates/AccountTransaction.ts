import IAccountTransaction, {
  IAccountTransactionParams
} from "./interfaces/IAccountTransaction"
import ITransaction from "./entities/interfaces/ITransaction"
import IAccount from "../entities/interfaces/IAccount"
import Account from "../entities/Account"

export default class AccountTransaction implements IAccountTransaction {
  readonly transaction: ITransaction
  readonly account: IAccount

  constructor(params: IAccountTransactionParams) {
    this.transaction = params.transaction
    this.account = new Account(params.account)
  }
}
