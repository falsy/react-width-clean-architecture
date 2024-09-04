import IAccount from "adapters/domains/entities/interfaces/IAccount"

export default interface IAccountUseCase {
  getAccounts(): Promise<IAccount[]>
}
