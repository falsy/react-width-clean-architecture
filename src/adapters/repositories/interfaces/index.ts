import IAccountRepository from "./IAccountRepository"
import ICardRepository from "./ICardRepository"
import ITransactionRepository from "./ITransactionRepository"
import IUserRepository from "./IUserRepository"

export default interface IRepositories {
  user: IUserRepository
  transaction: ITransactionRepository
  card: ICardRepository
  account: IAccountRepository
}
