import ICard from "adapters/domains/entities/interfaces/ICard"

export default interface ICardTxnSummaryVM {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly card: ICard
  readonly longTime: number
  readonly dayOfWeek: string
  readonly day: string
}
