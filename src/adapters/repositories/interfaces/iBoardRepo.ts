import { IBoardDTO } from "../../dto/boardDTO"
import { ICommentDTO } from "../../dto/CommentDTO"

export interface IBoardRepository {
  getBoards(): Promise<Array<IBoardDTO>>
  insertBoard(author: string, content: string): Promise<boolean>
  getComments(): Promise<Array<ICommentDTO>>
}