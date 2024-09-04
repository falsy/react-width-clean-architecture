import IAccountDTO from "adapters/dtos/interfaces/IAccountDTO"
import IAccountUseCase from "./interfaces/IAccountUseCase"
import IAccount from "../entities/interfaces/IAccount"
import Account from "../entities/Account"
import IAccountRepository from "adapters/repositories/interfaces/IAccountRepository"

export default class AccountUseCase implements IAccountUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async getAccounts(): Promise<IAccount[]> {
    const accountDTOs = await this.accountRepository.getAccounts()
    const accounts = accountDTOs.map((accountDTO: IAccountDTO) => {
      return new Account(accountDTO)
    })

    return accounts
  }
}
