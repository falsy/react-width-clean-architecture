import ICardTransaction, {
  ICardTransactionParams
} from "./interfaces/ICardTransaction"
import ICardInfoVO from "../vos/interfaces/ICardInfoVO"
import IFranchise from "./entities/interfaces/IFranchise"
import CardInfoVO from "../vos/CardInfoVO"
import Transaction from "./entities/Transaction"

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
