import { IBoardAction } from '../interfaces-redux/iBoard';

export interface IBoardPresenter {
  getBoards(): Promise<IBoardAction>
  insertBoard(author: string, content: string): Promise<boolean>
}