import { IBoardConverter } from './interfaces-converters/iBoardConv'
import { IBoardVM } from '../vm/Board'
import { IBoardDTO } from '../dto/boardDTO'
import { ICommentDTO } from '../dto/CommentDTO'
import { IBoardRepository } from '../repositories/interfaces/iBoardRepo'
import { IBoardPresenter } from './interfaces/iBoardPre'

class BoardPresenter implements IBoardPresenter {

  constructor(
    private readonly repository: IBoardRepository, 
    private readonly converter: IBoardConverter
  ) {}

  async getBoards(): Promise<Array<IBoardVM>> {
    const boardDTOList: Array<IBoardDTO> = await this.repository.getBoards()
    const commentDTOList: Array<ICommentDTO> = await this.repository.getComments()
    const boardVMList: Array<IBoardVM> = this.converter.convertBoardVM(boardDTOList, commentDTOList)
    return boardVMList
  }

  insertBoard(author: string, content: string): Promise<boolean> {
    return this.repository.insertBoard(author, content)
  }

}


export default BoardPresenter