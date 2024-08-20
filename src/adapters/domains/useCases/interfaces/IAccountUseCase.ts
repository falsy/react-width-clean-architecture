import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"
import IAccount from "adapters/domains/entities/interfaces/IAccount"

export default interface IAccountUseCase {
  getAccounts(): Promise<ILayerDTO<IAccount[]>>
}
