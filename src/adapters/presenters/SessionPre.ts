import UserDTO from '../dto/UserDTO'
import { ISessionRepository } from '../repositories/interfaces/iSessionRepo'
import { ISessionPresenter } from './interfaces/iSessionPre'


class SessionPresenter implements ISessionPresenter {

  constructor(
    private readonly repository: ISessionRepository
  ) {}

  async login(id: string, pw: string): Promise<string> {
    return await this.repository.login(new UserDTO({ id, pw }))
  }

  getToken(): string {
    return this.repository.getToken()
  }

  setToken(token: string): void {
    this.repository.setToken(token)
  }

  removeToken(): void {
    this.repository.removeToken()
  }

}

export default SessionPresenter