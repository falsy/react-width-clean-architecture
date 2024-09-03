import Transaction from "./entities/Transaction"
import ICardTransaction, {
  ICardTransactionParams
} from "./interfaces/ICardTransaction"
import ICard from "../entities/interfaces/ICard"
import Card from "../entities/Card"

export default class CardTransaction implements ICardTransaction {
  readonly transaction: Transaction
  readonly card: ICard

  constructor(params: ICardTransactionParams) {
    this.transaction = params.transaction
    this.card = new Card(params.card)
  }
}
