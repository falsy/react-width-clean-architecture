import IAccountRepository from "./IAccountRepository"
import ICardRepository from "./ICardRepository"
import IFranchiseRepository from "./IFranchiseRepository"
import ITransactionRepository from "./ITransactionRepository"
import IUserRepository from "./IUserRepository"

export default interface IRepositories {
  user: IUserRepository
  transaction: ITransactionRepository
  franchise: IFranchiseRepository
  card: ICardRepository
  account: IAccountRepository
}
