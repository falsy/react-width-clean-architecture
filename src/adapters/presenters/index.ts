import IUseCases from "adapters/domains/useCases/interfaces"
import UserPresenter from "./UserPresenter"
import IPresenter from "./interfaces"
import TransactionPresenter from "./TransactionPresenter"
import CardPresenter from "./CardPresenter"
import AccountPresenter from "./AccountPresenter"

export default function presenters(useCases: IUseCases): IPresenter {
  return {
    user: new UserPresenter(useCases.user),
    transaction: new TransactionPresenter(useCases.transaction),
    card: new CardPresenter(useCases.card),
    account: new AccountPresenter(useCases.account)
  }
}
