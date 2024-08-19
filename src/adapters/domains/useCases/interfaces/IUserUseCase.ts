import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"
import IUser from "adapters/domains/entities/interfaces/IUser"

export default interface IUserUseCase {
  getUserInfo(): Promise<ILayerDTO<IUser>>
}
