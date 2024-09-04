import { validateOrReject } from "class-validator"
import { API_URI } from "constants/networks"
import IClientHTTP from "adapters/infrastructures/interfaces/IClientHTTP"
import ITransactionRepository from "./interfaces/ITransactionRepository"
import ITransactionDTO, {
  ITransactionDTOParams
} from "adapters/dtos/interfaces/ITransactionDTO"
import {
  IFilterTxnParams,
  ICreateTxnParams
} from "adapters/dtos/interfaces/requests/IRequestTransactionDTO"
import TransactionDTO from "adapters/dtos/TransactionDTO"

export default class TransactionRepository implements ITransactionRepository {
  constructor(private clientHttp: IClientHTTP) {}

  async getTransactions(params: IFilterTxnParams): Promise<ITransactionDTO[]> {
    try {
      const res = await this.clientHttp.get(`${API_URI}/api/transactions`, {
        params: { year: params?.year, month: params?.month, type: params?.type }
      })

      if (res.status !== 200) {
        throw new Error("Error occurred while fetching data")
      }

      const transactionDTOs = await Promise.all(
        res.data.map(async (transaction: ITransactionDTOParams) => {
          const transactionDTO = new TransactionDTO(transaction)
          await validateOrReject(transactionDTO)
          return transactionDTO
        })
      )

      return transactionDTOs
    } catch (error) {
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error("Unknown error type")
      }
    }
  }

  async addTransaction(params: ICreateTxnParams): Promise<boolean> {
    try {
      const res = await this.clientHttp.post(`${API_URI}/api/transaction`, {
        transaction: {
          keyword: params.keyword,
          amount: params.amount,
          card_id: params.cardId,
          account_id: params.accountId
        }
      })

      if (res.status !== 201) {
        throw new Error("Error occurred while fetching data")
      }

      return res.data
    } catch (error) {
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error("Unknown error type")
      }
    }
  }
}
