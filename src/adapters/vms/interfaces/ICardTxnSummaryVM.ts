import ICardInfoVO from "adapters/domains/vos/interfaces/ICardInfoVO"

export default interface ICardTxnSummaryVM {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly card: ICardInfoVO
  readonly longTime: number
  readonly dayOfWeek: string
  readonly day: string
}
