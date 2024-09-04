import ICardTransaction, {
  ICardTransactionParams
} from "./interfaces/ICardTransaction"
import CardInfoVO from "../vos/CardInfoVO"
import ICardInfoVO from "../vos/interfaces/ICardInfoVO"
import Transaction from "./entities/Transaction"
import IFranchise from "./entities/interfaces/IFranchise"

export default class CardTransaction
  extends Transaction
  implements ICardTransaction
{
  readonly franchise?: IFranchise
  readonly card: ICardInfoVO

  constructor(params: ICardTransactionParams) {
    super(params.transaction)
    if (params.franchise) this.franchise = params.franchise
    this.card = new CardInfoVO(params.card)
  }
}
