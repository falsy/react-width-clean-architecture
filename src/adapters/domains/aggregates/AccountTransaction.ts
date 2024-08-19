import { IsString, ValidateNested } from "class-validator"
import IAccountTransaction, {
  IAccountTransactionParams
} from "./interfaces/IAccountTransaction"
import AccountInfoVO from "../vos/AccountInfoVO"
import IAccountInfoVO from "../vos/interfaces/IAccountInfoVO"
import ITransaction from "./entities/interfaces/ITransaction"

export default class AccountTransaction implements IAccountTransaction {
  @ValidateNested()
  readonly transaction: ITransaction

  @ValidateNested()
  readonly account: IAccountInfoVO

  @IsString()
  readonly accountId: string

  constructor(params: IAccountTransactionParams) {
    this.transaction = params.transaction
    this.account = new AccountInfoVO(params.account)
    this.accountId = params.account.id
  }
}
