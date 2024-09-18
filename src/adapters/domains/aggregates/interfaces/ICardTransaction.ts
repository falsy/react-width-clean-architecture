import ICard from "../../entities/interfaces/ICard"
import ITransaction from "../entities/interfaces/ITransaction"
import IFranchise from "../entities/interfaces/IFranchise"

export interface ICardTransactionParams {
  transaction: ITransaction
  franchise?: IFranchise | null
  card: ICard
}

export default interface ICardTransaction extends ITransaction {
  readonly franchise?: IFranchise
  readonly card: ICard
}
