import IAccount from "adapters/domains/entities/interfaces/IAccount"

export default interface IAccountTxnSummaryVM {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly account: IAccount
  readonly longTime: number
  readonly dayOfWeek: string
  readonly day: string
}
