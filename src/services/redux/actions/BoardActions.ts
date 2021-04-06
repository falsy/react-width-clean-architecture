import { IBoardVM } from "../../../adapters/vm/Board"
import { IBoardActions } from "../../../adapters/presenters/interfaces-redux/iBoardActions"
import { GET_BOARD, IBoardAction } from "../../../adapters/presenters/interfaces-redux/iBoard"


class BoardActions implements IBoardActions {

  getBoards(boardVMList: Array<IBoardVM>): IBoardAction {
    return {
      type: GET_BOARD,
      payload: {
        list: boardVMList
      }
    }
  }

}


export default BoardActions