import ITransaction from "../entities/interfaces/ITransaction"
import ICard from "../../entities/interfaces/ICard"

export interface ICardTransactionParams {
  transaction: ITransaction
  card: ICard
}

export default interface ICardTransaction {
  readonly transaction: ITransaction
  readonly card: ICard
}
