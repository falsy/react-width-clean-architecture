import IUser from "adapters/domains/entities/interfaces/IUser"
import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"

export default interface IUserPresenter {
  getUserInfo(): Promise<ILayerDTO<IUser>>
}
