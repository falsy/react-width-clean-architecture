import { validateOrReject } from "class-validator"
import { API_URI } from "constants/networks"
import IClientHTTP from "adapters/infrastructures/interfaces/IClientHTTP"
import ITransactionRepository from "./interfaces/ITransactionRepository"
import ITransactionDTO, {
  ITransactionDTOParams
} from "adapters/dtos/interfaces/ITransactionDTO"
import { IRequestTransactionParams } from "adapters/dtos/interfaces/requests/IRequestTransactionDTO"
import TransactionDTO from "adapters/dtos/TransactionDTO"

export default class TransactionRepository implements ITransactionRepository {
  constructor(private clientHttp: IClientHTTP) {}

  async getTransactions(
    year?: number,
    month?: number
  ): Promise<ITransactionDTO[]> {
    try {
      const res = await this.clientHttp.get(`${API_URI}/api/transactions`, {
        params: { year, month }
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

  async addTransaction(
    reqTransactionParams: IRequestTransactionParams
  ): Promise<boolean> {
    try {
      const res = await this.clientHttp.post(`${API_URI}/api/transaction`, {
        transaction: reqTransactionParams
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
