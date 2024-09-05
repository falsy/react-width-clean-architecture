import IAccountDTO from "adapters/dtos/interfaces/IAccountDTO"

export default interface IAccountRepository {
  getAccounts(): Promise<IAccountDTO[]>
}
