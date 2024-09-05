import ITransactionDTO from "adapters/dtos/interfaces/ITransactionDTO"
import {
  IFilterTxnParams,
  ICreateTxnParams
} from "adapters/dtos/interfaces/requests/IRequestTransactionDTO"

export default interface ITransactionRepository {
  getTransactions(params?: IFilterTxnParams): Promise<ITransactionDTO[]>
  addTransaction(params: ICreateTxnParams): Promise<boolean>
}
