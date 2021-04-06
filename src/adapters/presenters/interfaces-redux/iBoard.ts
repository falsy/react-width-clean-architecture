import { IBoardVM } from "../../vm/Board";

export const GET_BOARD = 'GET_BOARD'

export interface IBoardList {
  list: Array<IBoardVM>
}

export interface IBoardAction {
  type: string
  payload: IBoardList
}

export interface IBoardStateGroup {
  board: IBoardList
}

export interface IReducer {
  (state: IBoardList, action: IBoardAction): IBoardList
}
