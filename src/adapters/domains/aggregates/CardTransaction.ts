import { IsString, ValidateNested } from "class-validator"
import Transaction from "./Transaction"
import ICardTransaction, {
  ICardTransactionParams
} from "./interfaces/ICardTransaction"
import CardInfoVO from "../vos/CardInfoVO"
import ICardInfoVO from "../vos/interfaces/ICardInfoVO"

export default class CardTransaction
  extends Transaction
  implements ICardTransaction
{
  @ValidateNested()
  readonly card: ICardInfoVO

  @IsString()
  readonly cardId: string

  constructor(params: ICardTransactionParams) {
    super(params)
    this.card = new CardInfoVO(params.card)
    this.cardId = params.card.id
  }
}
