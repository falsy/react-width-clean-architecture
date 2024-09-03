import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"
import IRequestTransactionDTO from "adapters/dtos/requests/interfaces/IRequestTransactionDTO"
import ITransactionDTO from "adapters/dtos/interfaces/ITransactionDTO"
import ITxnCategoryDTO from "adapters/dtos/interfaces/ITxnCategoryDTO"

export default interface ITransactionRepository {
  getTransactions(
    year?: number,
    month?: number
  ): Promise<ILayerDTO<ITransactionDTO[]>>
  addTransaction(
    reqTransactionDTO: IRequestTransactionDTO
  ): Promise<ILayerDTO<boolean>>
  getTxnCategories(): Promise<ILayerDTO<ITxnCategoryDTO[]>>
}
