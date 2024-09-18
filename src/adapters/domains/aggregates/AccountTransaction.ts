import IAccountTransaction, {
  IAccountTransactionParams
} from "./interfaces/IAccountTransaction"
import Transaction from "./entities/Transaction"
import IAccount from "../entities/interfaces/IAccount"

export default class AccountTransaction
  extends Transaction
  implements IAccountTransaction
{
  readonly account: IAccount

  constructor(params: IAccountTransactionParams) {
    super(params.transaction)
    this.account = params.account
  }
}
