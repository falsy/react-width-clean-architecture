import {
  ICreateTxnParams,
  IFilterTxnParams
} from "adapters/dtos/interfaces/requests/IRequestTransactionDTO"
import IAccountTransactionVM from "adapters/vms/interfaces/IAccountTransactionVM"
import IAccountTxnSummaryVM from "adapters/vms/interfaces/IAccountTxnSummaryVM"
import ICardTransactionVM from "adapters/vms/interfaces/ICardTransactionVM"
import ICardTxnSummaryVM from "adapters/vms/interfaces/ICardTxnSummaryVM"

export default interface ITransactionPresenter {
  getRecentAccountTransactionSummary(): Promise<IAccountTxnSummaryVM[]>
  getRecentCardTransactionSummary(): Promise<ICardTxnSummaryVM[]>
  getTotalTransactions(
    params?: IFilterTxnParams
  ): Promise<Array<ICardTransactionVM | IAccountTransactionVM>>
  addTransaction(reqTransactionParams: ICreateTxnParams): Promise<boolean>
}
