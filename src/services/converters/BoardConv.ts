import { IBoardDTO } from '../../adapters/dto/boardDTO'
import { ICommentDTO } from '../../adapters/dto/CommentDTO'
import BoardVM, { IBoardVM } from '../../adapters/vm/Board'
import CommentVM from '../../adapters/vm/Comment'
import { IBoardConverter } from '../../adapters/presenters/interfaces-converters/iBoardConv'

class BoardConverter implements IBoardConverter {
  convertBoardVM(boardDTOs: Array<IBoardDTO>, commetDTOs: Array<ICommentDTO>): Array<IBoardVM> {
    return boardDTOs.map(board => {
      const comments = commetDTOs.filter(comment => comment.boardId === board.id)
        .map(comment => new CommentVM(comment))
      const boardVM = new BoardVM(board).pushComment(comments)
      return boardVM
    })
  }
}

export default BoardConverter