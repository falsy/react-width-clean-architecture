import IUserPresenter from "./interfaces/IUserPresenter"
import IUserUseCase from "adapters/domains/useCases/interfaces/IUserUseCase"
import IUser from "adapters/domains/entities/interfaces/IUser"

export default class UserPresenter implements IUserPresenter {
  constructor(private userUseCase: IUserUseCase) {}

  getUser(): Promise<IUser> {
    return this.userUseCase.getUser()
  }
}
