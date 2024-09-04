import IAccount from "adapters/domains/entities/interfaces/IAccount"

export default interface IAccountPresenter {
  getAccounts(): Promise<IAccount[]>
}
