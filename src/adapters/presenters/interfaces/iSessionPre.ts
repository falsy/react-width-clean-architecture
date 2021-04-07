export interface ISessionPresenter {
  login(id: string, pw: string): Promise<string>
  getToken(): string
  setToken(token: string): any
  removeToken(): void
}