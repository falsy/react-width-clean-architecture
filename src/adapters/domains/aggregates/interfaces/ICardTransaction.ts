import ITransaction, { ITransactionParams } from "./ITransaction"
import ICard from "../../entities/interfaces/ICard"
import ICardInfoVO from "adapters/domains/vos/interfaces/ICardInfoVO"

export interface ICardTransactionParams extends ITransactionParams {
  card: ICard
}

export default interface ICardTransaction extends ITransaction {
  readonly card: ICardInfoVO
  readonly cardId: string
}
