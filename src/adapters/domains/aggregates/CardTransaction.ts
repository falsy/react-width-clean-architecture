import ICardTransaction, {
  ICardTransactionParams
} from "./interfaces/ICardTransaction"
import Transaction from "./entities/Transaction"
import IFranchise from "./entities/interfaces/IFranchise"
import ICard from "../entities/interfaces/ICard"

export default class CardTransaction
  extends Transaction
  implements ICardTransaction
{
  readonly franchise?: IFranchise
  readonly card: ICard

  constructor(params: ICardTransactionParams) {
    super(params.transaction)
    if (params.franchise) this.franchise = params.franchise
    this.card = params.card
  }
}
