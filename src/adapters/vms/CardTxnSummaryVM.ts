import ICardTransaction from "adapters/domains/aggregates/interfaces/ICardTransaction"
import ICardInfoVO from "adapters/domains/vos/interfaces/ICardInfoVO"
import ICardTxnSummaryVM from "./interfaces/ICardTxnSummaryVM"

export default class CardTxnSummaryVM implements ICardTxnSummaryVM {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly card: ICardInfoVO
  readonly longTime: number
  readonly dayOfWeek: string
  readonly day: string

  constructor(params: ICardTransaction) {
    const date = new Date(params.createdAt)

    this.id = params.id
    this.amount = params.amount
    this.keyword = params.keyword
    this.card = params.card
    this.longTime = date.getTime()
    this.dayOfWeek = date.toLocaleString("en", {
      weekday: "short"
    })
    this.day = date.getDate().toString().padStart(2, "0")
  }
}
