import { GET_BOARD, IBoardAction, IBoardList, IReducer } from "../../../adapters/presenters/interfaces-redux/iBoard"

const initState: IBoardList = {
  list: []
}

const board: IReducer = (state = initState, action: IBoardAction) => {
  switch (action.type) {
    case GET_BOARD:
      return {
        list: action.payload.list
      }
    default:
      return {
        ...state
      }
  }
}

export default board