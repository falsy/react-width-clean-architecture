import { IBoardAction } from "./iBoard";
import { IBoardVM } from "../../vm/Board";

export interface IBoardActions {
  getBoards(boardVMList: Array<IBoardVM>): IBoardAction
}