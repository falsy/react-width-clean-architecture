import ITransaction, { ITransactionParams } from "./ITransaction"
import ICard from "../../entities/interfaces/ICard"

export interface ICardTransactionParams extends ITransactionParams {
  card: ICard
}

export default interface ICardTransaction extends ITransaction {
  card: ICard
}
