import { ILoginAction, IReducer, IToken, LOGIN } from "../../../adapters/presenters/interfaces-redux/iSession"

const initState: IToken = {
  token: ''
}

const session: IReducer = (state = initState, action: ILoginAction): IToken => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.payload.token
      }
    default:
      return {
        ...state
      }
  }
}

export default session