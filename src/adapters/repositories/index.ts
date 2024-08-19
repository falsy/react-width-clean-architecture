import IClientHTTP from "adapters/infrastructures/interfaces/IClientHTTP"
import UserRepository from "./UserRepository"
import IRepositories from "./interfaces"
import TransactionRepository from "./TransactionRepository"
import CardRepository from "./CardRepository"
import AccountRepository from "./AccoutRepository"

export default function repositories(clientHttp: IClientHTTP): IRepositories {
  return {
    user: new UserRepository(clientHttp),
    transaction: new TransactionRepository(clientHttp),
    card: new CardRepository(clientHttp),
    account: new AccountRepository(clientHttp)
  }
}
