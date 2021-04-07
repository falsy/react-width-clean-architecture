import { ICommentDTO } from '../../dto/CommentDTO'
import { IBoardDTO } from '../../dto/boardDTO'
import { IBoardVM } from '../../vm/Board'

export interface IBoardConverter {
  convertBoardVM(boardDTOs: Array<IBoardDTO>, commetDTOs: Array<ICommentDTO>): Array<IBoardVM>
}