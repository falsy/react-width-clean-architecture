import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"
import IUserPresenter from "./interfaces/IUserPresenter"
import IUserUseCase from "adapters/domains/useCases/interfaces/IUserUseCase"
import IUser from "adapters/domains/entities/interfaces/IUser"

export default class UserPresenter implements IUserPresenter {
  constructor(private userUseCase: IUserUseCase) {}

  getUserInfo(): Promise<ILayerDTO<IUser>> {
    return this.userUseCase.getUserInfo()
  }
}
