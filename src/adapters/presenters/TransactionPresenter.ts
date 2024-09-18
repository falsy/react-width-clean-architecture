import ITransactionUseCase from "adapters/domains/useCases/interfaces/ITransactionUseCase"
import ICardTransaction from "adapters/domains/aggregates/interfaces/ICardTransaction"
import IAccountTransaction from "adapters/domains/aggregates/interfaces/IAccountTransaction"
import ICardTransactionVM from "adapters/vms/interfaces/ICardTransactionVM"
import IAccountTransactionVM from "adapters/vms/interfaces/IAccountTransactionVM"
import ITransactionPresenter from "./interfaces/ITransactionPresenter"
import {
  ICreateTxnParams,
  IFilterTxnParams
} from "adapters/dtos/interfaces/requests/IRequestTransactionDTO"
import CardTransactionVM from "adapters/vms/CardTransactionVM"
import AccountTransactionVM from "adapters/vms/AccountTransactionVM"
import CardTransaction from "adapters/domains/aggregates/CardTransaction"
import IAccountTxnSummaryVM from "adapters/vms/interfaces/IAccountTxnSummaryVM"
import AccountTxnSummaryVM from "adapters/vms/AccountTxnSummaryVM"
import ICardTxnSummaryVM from "adapters/vms/interfaces/ICardTxnSummaryVM"
import CardTxnSummaryVM from "adapters/vms/CardTxnSummaryVM"

export default class TransactionPresenter implements ITransactionPresenter {
  constructor(private TransactionUseCase: ITransactionUseCase) {}

  async getRecentAccountTransactionSummary(): Promise<IAccountTxnSummaryVM[]> {
    const currentDate = new Date()
    const transactions = (await this.TransactionUseCase.getTransactions({
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      type: "ACCOUNT"
    })) as IAccountTransaction[]

    const recentAccountTransactionSummaryVMs = transactions.map(
      (transaction: IAccountTransaction) => {
        return new AccountTxnSummaryVM(transaction)
      }
    )

    return recentAccountTransactionSummaryVMs
  }

  async getRecentCardTransactionSummary(): Promise<ICardTxnSummaryVM[]> {
    const currentDate = new Date()
    const transactions = (await this.TransactionUseCase.getTransactions({
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      type: "CARD"
    })) as ICardTransaction[]

    const recentCardTransactionSummaryVMs = transactions.map(
      (transaction: ICardTransaction) => {
        return new CardTxnSummaryVM(transaction)
      }
    )

    return recentCardTransactionSummaryVMs
  }

  async getTransactions(
    params: IFilterTxnParams
  ): Promise<Array<ICardTransactionVM | IAccountTransactionVM>> {
    const transactions = await this.TransactionUseCase.getTransactions(params)

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

  addTransaction(reqTransactionParams: ICreateTxnParams): Promise<boolean> {
    return this.TransactionUseCase.addTransaction(reqTransactionParams)
  }
}
