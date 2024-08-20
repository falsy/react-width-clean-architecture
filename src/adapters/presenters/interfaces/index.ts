import ICardPresenter from "./ICardPresenter"
import ITransactionPresenter from "./ITransactionPresenter"
import IUserPresenter from "./IUserPresenter"
import IAccountPresenter from "./IAccountPresenter"

export default interface IPresenter {
  user: IUserPresenter
  transaction: ITransactionPresenter
  card: ICardPresenter
  account: IAccountPresenter
}
