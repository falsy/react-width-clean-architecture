import { ILoginAction } from "../interfaces-redux/iSession";

export interface ISessionPresenter {
  login(id: string, pw: string): Promise<ILoginAction>
  getToken(): string
  setToken(token: string): any
  removeToken(): void
}