import IAccountTransaction, {
  IAccountTransactionParams
} from "./interfaces/IAccountTransaction"
import IAccountInfoVO from "../vos/interfaces/IAccountInfoVO"
import AccountInfoVO from "../vos/AccountInfoVO"
import Transaction from "./entities/Transaction"

export default class AccountTransaction
  extends Transaction
  implements IAccountTransaction
{
  readonly account: IAccountInfoVO

  constructor(params: IAccountTransactionParams) {
    super(params.transaction)
    this.account = new AccountInfoVO(params.account)
  }
}
