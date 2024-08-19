import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"
import IUserInfoDTO from "adapters/dtos/interfaces/IUserInfoDTO"

export default interface IUserRepository {
  getUserInfo(): Promise<ILayerDTO<IUserInfoDTO>>
}
