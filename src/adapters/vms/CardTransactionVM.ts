import { IsNumber, IsString, ValidateNested } from "class-validator"
import ICardTransaction from "adapters/domains/aggregates/interfaces/ICardTransaction"
import ITxnCategoryVO from "adapters/domains/vos/interfaces/ITxnCategoryVO"
import ICardTransactionVM from "./interfaces/ICardTransactionVM"
import ICardInfoVO from "adapters/domains/vos/interfaces/ICardInfoVO"

export default class CardTransactionVM implements ICardTransactionVM {
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
  readonly card: ICardInfoVO

  @IsString()
  readonly cardId: string

  @IsString()
  readonly yearMonthDate: string

  @IsNumber()
  readonly longTime: number

  @IsString()
  readonly dayOfWeek: string

  @IsNumber()
  readonly date: number

  constructor(params: ICardTransaction) {
    this.id = params.transaction.id
    this.amount = params.transaction.amount
    this.keyword = params.transaction.keyword
    this.createdAt = params.transaction.createdAt
    this.category = params.transaction.category
    this.card = params.card
    this.cardId = params.cardId
    this.yearMonthDate = params.transaction.createdAt.split(" ")[0]
    this.longTime = new Date(params.transaction.createdAt).getTime()
    this.dayOfWeek = new Date(params.transaction.createdAt).toLocaleString(
      "en-US",
      {
        weekday: "long"
      }
    )
    this.date = new Date(params.transaction.createdAt).getDate()
  }
}
