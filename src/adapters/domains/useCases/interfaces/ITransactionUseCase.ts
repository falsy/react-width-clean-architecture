import IAccountTransaction from "adapters/domains/aggregates/interfaces/IAccountTransaction"
import ICardTransaction from "adapters/domains/aggregates/interfaces/ICardTransaction"
import { IRequestTransactionParams } from "adapters/dtos/interfaces/requests/IRequestTransactionDTO"

export default interface ITransactionUseCase {
  getTransactions(
    year?: number,
    month?: number
  ): Promise<Array<ICardTransaction | IAccountTransaction>>
  addTransaction(
    reqTransactionParams: IRequestTransactionParams
  ): Promise<boolean>
}
