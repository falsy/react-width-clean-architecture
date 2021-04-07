import { IUserDTO } from '../../../adapters/dto/UserDTO'

export interface ISessionRepository {
  login(userDTO: IUserDTO): Promise<string>
  getToken(): string
  setToken(token: string): void
  removeToken(): void
}