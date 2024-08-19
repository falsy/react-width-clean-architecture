import { IsNumber, IsString, ValidateNested } from "class-validator"
import ICardTransaction from "adapters/domains/aggregates/interfaces/ICardTransaction"
import ITxnCategoryVO from "adapters/domains/vos/interfaces/ITxnCategoryVO"
import ICard from "adapters/domains/entities/interfaces/ICard"
import ICardTransactionVM from "./interfaces/ICardTransactionVM"

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
  readonly card: ICard

  @IsString()
  readonly yearMonthDate: string

  @IsNumber()
  readonly longTime: number

  @IsString()
  readonly dayOfWeek: string

  @IsNumber()
  readonly date: number

  constructor(params: ICardTransaction) {
    this.id = params.id
    this.amount = params.amount
    this.keyword = params.keyword
    this.createdAt = params.createdAt
    this.category = params.category
    this.card = params.card
    this.yearMonthDate = params.createdAt.split(" ")[0]
    this.longTime = new Date(params.createdAt).getTime()
    this.dayOfWeek = new Date(params.createdAt).toLocaleString("en-US", {
      weekday: "long"
    })
    this.date = new Date(params.createdAt).getDate()
  }
}
