import ICardInfoVO from "adapters/domains/vos/interfaces/ICardInfoVO"
import ICard from "../../entities/interfaces/ICard"
import ITransaction from "../entities/interfaces/ITransaction"
import IFranchise from "../entities/interfaces/IFranchise"

export interface ICardTransactionParams {
  transaction: ITransaction
  franchise?: IFranchise | null
  card: ICard
}

export default interface ICardTransaction {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly franchise?: IFranchise
  readonly cardId?: string
  readonly card: ICardInfoVO
  readonly createdAt: string
}
