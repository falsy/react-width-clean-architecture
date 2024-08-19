import { IsString, ValidateNested } from "class-validator"
import Transaction from "./Transaction"
import IAccountTransaction, {
  IAccountTransactionParams
} from "./interfaces/IAccountTransaction"
import AccountInfoVO from "../vos/AccountInfoVO"
import IAccountInfoVO from "../vos/interfaces/IAccountInfoVO"

export default class AccountTransaction
  extends Transaction
  implements IAccountTransaction
{
  @ValidateNested()
  readonly account: IAccountInfoVO

  @IsString()
  readonly accountId: string

  constructor(params: IAccountTransactionParams) {
    super(params)
    this.account = new AccountInfoVO(params.account)
    this.accountId = params.account.id
  }
}
