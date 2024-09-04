import IAccountTransaction, {
  IAccountTransactionParams
} from "./interfaces/IAccountTransaction"
import AccountInfoVO from "../vos/AccountInfoVO"
import IAccountInfoVO from "../vos/interfaces/IAccountInfoVO"
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
