import ITransactionUseCase from "adapters/domains/useCases/interfaces/ITransactionUseCase"
import ICardTransaction from "adapters/domains/aggregates/interfaces/ICardTransaction"
import IAccountTransaction from "adapters/domains/aggregates/interfaces/IAccountTransaction"
import ICardTransactionVM from "adapters/vms/interfaces/ICardTransactionVM"
import IAccountTransactionVM from "adapters/vms/interfaces/IAccountTransactionVM"
import ITransactionPresenter from "./interfaces/ITransactionPresenter"
import { IRequestTransactionParams } from "adapters/dtos/interfaces/requests/IRequestTransactionDTO"
import CardTransactionVM from "adapters/vms/CardTransactionVM"
import AccountTransactionVM from "adapters/vms/AccountTransactionVM"
import CardTransaction from "adapters/domains/aggregates/CardTransaction"

export default class TransactionPresenter implements ITransactionPresenter {
  constructor(private TransactionUseCase: ITransactionUseCase) {}

  async getCurrentMonthTransactions(): Promise<
    Array<ICardTransactionVM | IAccountTransactionVM>
  > {
    const currentDate = new Date()
    const transactions = await this.TransactionUseCase.getTransactions(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    )

    const transactionVMs = transactions.map(
      (transaction: ICardTransaction | IAccountTransaction) => {
        if (transaction instanceof CardTransaction) {
          return new CardTransactionVM(transaction)
        }
        return new AccountTransactionVM(transaction as IAccountTransaction)
      }
    )

    return transactionVMs
  }

  async getTransactions(): Promise<
    Array<ICardTransactionVM | IAccountTransactionVM>
  > {
    const transactions = await this.TransactionUseCase.getTransactions()

    const transactionVMs = transactions.map(
      (transaction: ICardTransaction | IAccountTransaction) => {
        if (transaction instanceof CardTransaction) {
          return new CardTransactionVM(transaction)
        }
        return new AccountTransactionVM(transaction as IAccountTransaction)
      }
    )

    return transactionVMs
  }

  addTransaction(
    reqTransactionParams: IRequestTransactionParams
  ): Promise<boolean> {
    return this.TransactionUseCase.addTransaction(reqTransactionParams)
  }
}
