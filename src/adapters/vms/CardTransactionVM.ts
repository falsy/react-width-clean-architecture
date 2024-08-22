import ICardTransaction from "adapters/domains/aggregates/interfaces/ICardTransaction"
import ITxnCategoryVO from "adapters/domains/vos/interfaces/ITxnCategoryVO"
import ICardTransactionVM from "./interfaces/ICardTransactionVM"
import ICardInfoVO from "adapters/domains/vos/interfaces/ICardInfoVO"

export default class CardTransactionVM implements ICardTransactionVM {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly createdAt: string
  readonly category: ITxnCategoryVO
  readonly card: ICardInfoVO
  readonly cardId: string
  readonly yearMonthDate: string
  readonly longTime: number
  readonly dayOfWeek: string
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
