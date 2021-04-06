import { IBoardActions } from "./iBoardActions";
import { ISessionActions } from "./iSessionActions";

export interface IActions {
  session: ISessionActions
  board: IBoardActions
}