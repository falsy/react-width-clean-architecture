import { IsString, ValidateNested } from "class-validator"
import Transaction from "./entities/Transaction"
import ICardTransaction, {
  ICardTransactionParams
} from "./interfaces/ICardTransaction"
import CardInfoVO from "../vos/CardInfoVO"
import ICardInfoVO from "../vos/interfaces/ICardInfoVO"

export default class CardTransaction implements ICardTransaction {
  @ValidateNested()
  readonly transaction: Transaction

  @ValidateNested()
  readonly card: ICardInfoVO

  @IsString()
  readonly cardId: string

  constructor(params: ICardTransactionParams) {
    this.transaction = params.transaction
    this.card = new CardInfoVO(params.card)
    this.cardId = params.card.id
  }
}
