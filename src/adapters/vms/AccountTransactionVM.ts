import IAccountTransaction from "adapters/domains/aggregates/interfaces/IAccountTransaction"
import IAccountInfoVO from "adapters/domains/vos/interfaces/IAccountInfoVO"
import IAccountTransactionVM from "./interfaces/IAccountTransactionVM"

export default class AccountTransactionVM implements IAccountTransactionVM {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly createdAt: string
  readonly account: IAccountInfoVO
  readonly yearMonthDate: string
  readonly longTime: number
  readonly dayOfWeek: string
  readonly date: number

  constructor(params: IAccountTransaction) {
    this.id = params.id
    this.amount = params.amount
    this.keyword = params.keyword
    this.createdAt = params.createdAt
    this.account = params.account
    this.yearMonthDate = params.createdAt.split(" ")[0]
    this.longTime = new Date(params.createdAt).getTime()
    this.dayOfWeek = new Date(params.createdAt).toLocaleString("en", {
      weekday: "long"
    })
    this.date = new Date(params.createdAt).getDate()
  }
}
