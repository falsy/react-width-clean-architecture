import IAccountTransaction from "adapters/domains/aggregates/interfaces/IAccountTransaction"
import IAccountInfoVO from "adapters/domains/vos/interfaces/IAccountInfoVO"
import IAccountTxnSummaryVM from "./interfaces/IAccountTxnSummaryVM"

export default class AccountTxnSummaryVM implements IAccountTxnSummaryVM {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly account: IAccountInfoVO
  readonly longTime: number
  readonly dayOfWeek: string
  readonly day: string

  constructor(params: IAccountTransaction) {
    const date = new Date(params.createdAt)

    this.id = params.id
    this.amount = params.amount
    this.keyword = params.keyword
    this.account = params.account
    this.longTime = date.getTime()
    this.dayOfWeek = date.toLocaleString("en", {
      weekday: "short"
    })
    this.day = date.getDate().toString().padStart(2, "0")
  }
}
