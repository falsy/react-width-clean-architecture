import IFranchise from "adapters/domains/aggregates/entities/interfaces/IFranchise"
import ICard from "adapters/domains/entities/interfaces/ICard"

export default interface ICardTransactionVM {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly franchise?: IFranchise
  readonly createdAt: string
  readonly card: ICard
  readonly longTime: number
  readonly date: string
}
