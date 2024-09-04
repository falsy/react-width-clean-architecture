import ITransactionDTO from "adapters/dtos/interfaces/ITransactionDTO"
import { IRequestTransactionParams } from "adapters/dtos/interfaces/requests/IRequestTransactionDTO"

export default interface ITransactionRepository {
  getTransactions(year?: number, month?: number): Promise<ITransactionDTO[]>
  addTransaction(
    reqTransactionParams: IRequestTransactionParams
  ): Promise<boolean>
}
