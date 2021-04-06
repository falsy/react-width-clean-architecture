import { ILoginAction } from "./iSession";

export interface ISessionActions {
  setToken(token: string): ILoginAction
}