import IAccountDTO from "adapters/dtos/interfaces/IAccountDTO"
import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"

export default interface IAccountRepository {
  getAccounts(): Promise<ILayerDTO<IAccountDTO[]>>
}
