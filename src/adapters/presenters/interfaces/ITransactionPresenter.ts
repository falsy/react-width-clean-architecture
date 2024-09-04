import { IRequestTransactionParams } from "adapters/dtos/interfaces/requests/IRequestTransactionDTO"
import IAccountTransactionVM from "adapters/vms/interfaces/IAccountTransactionVM"
import ICardTransactionVM from "adapters/vms/interfaces/ICardTransactionVM"

export default interface ITransactionPresenter {
  getCurrentMonthTransactions(
    year?: number,
    month?: number
  ): Promise<Array<ICardTransactionVM | IAccountTransactionVM>>
  getTransactions(): Promise<Array<ICardTransactionVM | IAccountTransactionVM>>
  addTransaction(
    reqTransactionParams: IRequestTransactionParams
  ): Promise<boolean>
}
