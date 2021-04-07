import { IBoardVM } from '../../../adapters/vm/Board'

export interface IBoardPresenter {
  getBoards(): Promise<Array<IBoardVM>>
  insertBoard(author: string, content: string): Promise<boolean>
}