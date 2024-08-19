import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"
import ITransactionDTO from "adapters/dtos/interfaces/ITransactionDTO"
import ITxnCategoryDTO from "adapters/dtos/interfaces/ITxnCategoryDTO"

export default interface ITransactionRepository {
  getTransactions(): Promise<ILayerDTO<ITransactionDTO[]>>
  getTxnCateogries(): Promise<ILayerDTO<ITxnCategoryDTO[]>>
}
