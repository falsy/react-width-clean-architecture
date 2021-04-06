import { ISessionActions } from "./interfaces-redux/iSessionActions"
import { ILoginAction } from "./interfaces-redux/iSession"
import UserDTO from "../dto/UserDTO"
import { ISessionRepository } from "../repositories/interfaces/iSessionRepo"
import { ISessionPresenter } from "./interfaces/iSessionPre"


class SessionPresenter implements ISessionPresenter {

  constructor(
    private readonly repository: ISessionRepository, 
    private readonly actions: ISessionActions
  ) {}

  async login(id: string, pw: string): Promise<ILoginAction> {
    const token = await this.repository.login(new UserDTO({ id, pw }))
    return this.setToken(token)
  }

  getToken(): string {
    return this.repository.getToken()
  }

  setToken(token: string): ILoginAction {
    this.repository.setToken(token)
    return this.actions.setToken(token)
  }

  removeToken(): ILoginAction {
    this.repository.removeToken()
    return this.setToken('')
  }

}

export default SessionPresenter