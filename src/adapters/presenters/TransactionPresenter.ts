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
import IAccountTxnSummaryVM from "adapters/vms/interfaces/IAccountTxnSummaryVM"
import AccountTxnSummaryVM from "adapters/vms/AccountTxnSummaryVM"
import ICardTxnSummaryVM from "adapters/vms/interfaces/ICardTxnSummaryVM"
import CardTxnSummaryVM from "adapters/vms/CardTxnSummaryVM"

export default class TransactionPresenter implements ITransactionPresenter {
  constructor(private TransactionUseCase: ITransactionUseCase) {}

  async getRecentAccountTransactionSummary(): Promise<IAccountTxnSummaryVM[]> {
    const currentDate = new Date()
    const transactions = (await this.TransactionUseCase.getAccountTransactions({
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1
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
    const transactions = (await this.TransactionUseCase.getCardTransactions({
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1
    })) as ICardTransaction[]

    const recentCardTransactionSummaryVMs = transactions.map(
      (transaction: ICardTransaction) => {
        return new CardTxnSummaryVM(transaction)
      }
    )

    return recentCardTransactionSummaryVMs
  }

  async getTotalTransactions(
    params?: IFilterTxnParams
  ): Promise<Array<ICardTransactionVM | IAccountTransactionVM>> {
    const [accountTransaction, cardTransaction] = await Promise.all([
      this.TransactionUseCase.getAccountTransactions(params),
      this.TransactionUseCase.getCardTransactions(params)
    ])

    const accountTransactionVMs = accountTransaction.map((transaction) => {
      return new AccountTransactionVM(transaction)
    })
    const cardTransactionVMs = cardTransaction.map((transaction) => {
      return new CardTransactionVM(transaction)
    })

    const transactionVMs = [...accountTransactionVMs, ...cardTransactionVMs]

    transactionVMs.sort((a, b) => a.longTime - b.longTime)

    return transactionVMs
  }

  addTransaction(reqTransactionParams: ICreateTxnParams): Promise<boolean> {
    return this.TransactionUseCase.addTransaction(reqTransactionParams)
  }
}
