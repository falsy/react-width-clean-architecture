import IAccountTransaction from "adapters/domains/aggregates/interfaces/IAccountTransaction"
import ICardTransaction from "adapters/domains/aggregates/interfaces/ICardTransaction"
import {
  IFilterTxnParams,
  ICreateTxnParams
} from "adapters/dtos/interfaces/requests/IRequestTransactionDTO"

export default interface ITransactionUseCase {
  getCardTransactions(
    params?: IFilterTxnParams
  ): Promise<Array<ICardTransaction>>
  getAccountTransactions(
    params?: IFilterTxnParams
  ): Promise<Array<IAccountTransaction>>
  addTransaction(params: ICreateTxnParams): Promise<boolean>
}
