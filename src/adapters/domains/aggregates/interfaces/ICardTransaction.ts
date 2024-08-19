import ICardInfoVO from "adapters/domains/vos/interfaces/ICardInfoVO"
import ICard from "../../entities/interfaces/ICard"
import ITransaction from "../entities/interfaces/ITransaction"

export interface ICardTransactionParams {
  transaction: ITransaction
  card: ICard
}

export default interface ICardTransaction {
  readonly transaction: ITransaction
  readonly card: ICardInfoVO
  readonly cardId: string
}
