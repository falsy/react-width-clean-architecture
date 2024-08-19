import { IsNumber, IsString, ValidateNested } from "class-validator"
import IAccountTransaction from "adapters/domains/aggregates/interfaces/IAccountTransaction"
import ITxnCategoryVO from "adapters/domains/vos/interfaces/ITxnCategoryVO"
import IAccountTransactionVM from "./interfaces/IAccountTransactionVM"
import IAccountInfoVO from "adapters/domains/vos/interfaces/IAccountInfoVO"

export default class AccountTransactionVM implements IAccountTransactionVM {
  @IsString()
  readonly id: string

  @IsNumber()
  readonly amount: number

  @IsString()
  readonly keyword: string

  @IsString()
  readonly createdAt: string

  @ValidateNested()
  readonly category: ITxnCategoryVO

  @ValidateNested()
  readonly account: IAccountInfoVO

  @IsString()
  readonly accountId: string

  @IsString()
  readonly yearMonthDate: string

  @IsNumber()
  readonly longTime: number

  @IsString()
  readonly dayOfWeek: string

  @IsNumber()
  readonly date: number

  constructor(params: IAccountTransaction) {
    this.id = params.id
    this.amount = params.amount
    this.keyword = params.keyword
    this.createdAt = params.createdAt
    this.category = params.category
    this.account = params.account
    this.accountId = params.accountId
    this.yearMonthDate = params.createdAt.split(" ")[0]
    this.longTime = new Date(params.createdAt).getTime()
    this.dayOfWeek = new Date(params.createdAt).toLocaleString("en-US", {
      weekday: "long"
    })
    this.date = new Date(params.createdAt).getDate()
  }
}
