import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"
import IAccountTransaction from "adapters/domains/aggregates/interfaces/IAccountTransaction"
import ICardTransaction from "adapters/domains/aggregates/interfaces/ICardTransaction"
import IRequestTransactionDTO from "adapters/dtos/requests/interfaces/IRequestTransactionDTO"
import TxnCategoryVO from "adapters/domains/vos/TxnCateogryVO"

export default interface ITransactionUseCase {
  getTransactions(): Promise<
    ILayerDTO<Array<ICardTransaction | IAccountTransaction>>
  >
  addTransaction(
    reqTransactionDTO: IRequestTransactionDTO
  ): Promise<ILayerDTO<boolean>>
  getTxnCateogries(): Promise<ILayerDTO<TxnCategoryVO[]>>
}
