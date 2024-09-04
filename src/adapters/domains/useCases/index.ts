import IRepositories from "adapters/repositories/interfaces"
import IUseCases from "./interfaces"
import UserUseCase from "./UserUseCaes"
import TransactionUseCase from "./TransactionUseCase"
import CardUseCase from "./CardUseCase"
import AccountUseCase from "./AccountUseCase"

export default function useCases(repositories: IRepositories): IUseCases {
  return {
    user: new UserUseCase(repositories.user),
    transaction: new TransactionUseCase(
      repositories.transaction,
      repositories.franchise,
      repositories.card,
      repositories.account
    ),
    card: new CardUseCase(repositories.card),
    account: new AccountUseCase(repositories.account)
  }
}
