import { validateOrReject } from "class-validator"
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
import { IRequestTransactionDTOParams } from "adapters/dtos/interfaces/IRequestTransactionDTO"
import RequestTransactionDTO from "adapters/dtos/RequestTransactionDTO"
import TxnCategoryVO from "adapters/domains/vos/TxnCateogryVO"

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
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error("Unknown error type")
      }
    }
  }

  getTxnCateogries(): Promise<ILayerDTO<TxnCategoryVO[]>> {
    return this.TransactionUseCase.getTxnCateogries()
  }

  addTransaction(
    transactionParams: IRequestTransactionDTOParams
  ): Promise<ILayerDTO<boolean>> {
    try {
      const reqTransactionDTO = new RequestTransactionDTO(transactionParams)
      validateOrReject(reqTransactionDTO)
      return this.TransactionUseCase.addTransaction(reqTransactionDTO)
    } catch (error) {
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error("Unknown error type")
      }
    }
  }
}
