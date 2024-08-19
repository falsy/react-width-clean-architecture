import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"
import ITransactionPresenter from "./interfaces/ITransactionPresenter"
import ITransactionUseCase from "adapters/domains/useCases/interfaces/ITransactionUseCase"
import ICardTransaction from "adapters/domains/aggregates/interfaces/ICardTransaction"
import IAccountTransaction from "adapters/domains/aggregates/interfaces/IAccountTransaction"
import ICardTransactionVM from "adapters/vms/interfaces/ICardTransactionVM"
import IAccountTransactionVM from "adapters/vms/interfaces/IAccountTransactionVM"
import LayerDTO from "adapters/dtos/LayerDTO"
import CardTransactionVM from "adapters/vms/CardTransactionVM"
import AccountTransactionVM from "adapters/vms/AccountTransactionVM"
import CardTransaction from "adapters/domains/aggregates/CardTransaction"
import { validateOrReject } from "class-validator"

export default class TransactionPresenter implements ITransactionPresenter {
  constructor(private TransactionUseCase: ITransactionUseCase) {}

  async getTransactions(): Promise<
    ILayerDTO<Array<ICardTransactionVM | IAccountTransactionVM>>
  > {
    try {
      const { isError, message, data } =
        await this.TransactionUseCase.getTransactions()

      if (isError || !data) {
        return new LayerDTO({
          isError,
          message
        })
      }

      const transactionVMs = data.map(
        (transaction: ICardTransaction | IAccountTransaction) => {
          if (transaction instanceof CardTransaction) {
            const cardTransactionVM = new CardTransactionVM(transaction)
            validateOrReject(cardTransactionVM)
            return cardTransactionVM
          }
          const accountTransactionVM = new AccountTransactionVM(
            transaction as IAccountTransaction
          )
          validateOrReject(accountTransactionVM)
          return accountTransactionVM
        }
      )

      return new LayerDTO({
        data: transactionVMs
      })
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "Unknown error type"
      )
      throw error
    }
  }
}
