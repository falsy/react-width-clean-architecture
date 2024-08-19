import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"
import IAccountTransaction from "adapters/domains/aggregates/interfaces/IAccountTransaction"
import ICardTransaction from "adapters/domains/aggregates/interfaces/ICardTransaction"

export default interface ITransactionUseCase {
  getTransactions(): Promise<
    ILayerDTO<Array<ICardTransaction | IAccountTransaction>>
  >
}
