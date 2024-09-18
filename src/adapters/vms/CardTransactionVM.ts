import ICardTransaction from "adapters/domains/aggregates/interfaces/ICardTransaction"
import ICardTransactionVM from "./interfaces/ICardTransactionVM"
import IFranchise from "adapters/domains/aggregates/entities/interfaces/IFranchise"
import ICard from "adapters/domains/entities/interfaces/ICard"

export default class CardTransactionVM implements ICardTransactionVM {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly franchise?: IFranchise
  readonly createdAt: string
  readonly card: ICard
  readonly longTime: number
  readonly date: string

  constructor(params: ICardTransaction) {
    this.id = params.id
    this.amount = params.amount
    this.keyword = params.keyword
    this.createdAt = params.createdAt
    if (params.franchise) this.franchise = params.franchise
    this.card = params.card
    this.longTime = new Date(params.createdAt).getTime()
    this.date = this.getParseDate(new Date(params.createdAt))
  }

  private getParseDate(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")
    const hour = date.getHours().toString().padStart(2, "0")
    const minute = date.getMinutes().toString().padStart(2, "0")
    return `${month}/${day} ${hour}:${minute}`
  }
}
