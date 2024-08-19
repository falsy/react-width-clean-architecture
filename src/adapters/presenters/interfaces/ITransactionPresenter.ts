import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"
import IAccountTransactionVM from "adapters/vms/interfaces/IAccountTransactionVM"
import ICardTransactionVM from "adapters/vms/interfaces/ICardTransactionVM"

export default interface ITransactionPresenter {
  getTransactions(): Promise<
    ILayerDTO<Array<ICardTransactionVM | IAccountTransactionVM>>
  >
}
