import ICardTransaction from "adapters/domains/aggregates/interfaces/ICardTransaction"
import ICardTransactionVM from "./interfaces/ICardTransactionVM"
import ICardInfoVO from "adapters/domains/vos/interfaces/ICardInfoVO"
import IFranchise from "adapters/domains/aggregates/entities/interfaces/IFranchise"

export default class CardTransactionVM implements ICardTransactionVM {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly franchise: IFranchise
  readonly createdAt: string
  readonly card: ICardInfoVO
  readonly yearMonthDate: string
  readonly longTime: number
  readonly dayOfWeek: string
  readonly date: number

  constructor(params: ICardTransaction) {
    this.id = params.id
    this.amount = params.amount
    this.keyword = params.keyword
    this.createdAt = params.createdAt
    this.franchise = params.franchise
    this.card = params.card
    this.yearMonthDate = params.createdAt.split(" ")[0]
    this.longTime = new Date(params.createdAt).getTime()
    this.dayOfWeek = new Date(params.createdAt).toLocaleString("en", {
      weekday: "long"
    })
    this.date = new Date(params.createdAt).getDate()
  }
}
