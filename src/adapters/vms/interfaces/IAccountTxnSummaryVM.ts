import IAccountInfoVO from "adapters/domains/vos/interfaces/IAccountInfoVO"

export default interface IAccountTxnSummaryVM {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly account: IAccountInfoVO
  readonly longTime: number
  readonly dayOfWeek: string
  readonly day: string
}
