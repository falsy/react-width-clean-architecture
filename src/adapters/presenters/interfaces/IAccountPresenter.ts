import IAccount from "adapters/domains/entities/interfaces/IAccount"
import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"

export default interface IAccountPresenter {
  getAccounts(): Promise<ILayerDTO<IAccount[]>>
}
