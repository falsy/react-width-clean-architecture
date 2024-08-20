import IUserUseCase from "./IUserUseCase"
import ITransactionUseCase from "./ITransactionUseCase"
import ICardUseCase from "./ICardUseCase"
import IAccountUseCase from "./IAccountUseCase"

export default interface IUseCases {
  user: IUserUseCase
  transaction: ITransactionUseCase
  card: ICardUseCase
  account: IAccountUseCase
}
