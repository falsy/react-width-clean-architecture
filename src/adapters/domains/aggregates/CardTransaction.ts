import { ValidateNested } from "class-validator"
import Transaction from "./Transaction"
import ICard from "../entities/interfaces/ICard"
import { ICardTransactionParams } from "./interfaces/ICardTransaction"

export default class CardTransaction extends Transaction {
  @ValidateNested()
  readonly card: ICard

  constructor(params: ICardTransactionParams) {
    super(params)
    this.card = params.card
  }
}
