import IFranchise from "adapters/domains/aggregates/entities/interfaces/IFranchise"
import ICardInfoVO from "adapters/domains/vos/interfaces/ICardInfoVO"

export default interface ICardTransactionVM {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly franchise?: IFranchise
  readonly createdAt: string
  readonly card: ICardInfoVO
  readonly longTime: number
  readonly date: string
}
