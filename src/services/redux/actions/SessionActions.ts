import { ISessionActions } from "../../../adapters/presenters/interfaces-redux/iSessionActions"
import { ILoginAction, LOGIN } from "../../../adapters/presenters/interfaces-redux/iSession"

class SessionActions implements ISessionActions {

  setToken(token: string): ILoginAction {
    return {
      type: LOGIN,
      payload: {
        token
      }
    }
  }

}


export default SessionActions