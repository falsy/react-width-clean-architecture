import { IActions } from '../../../adapters/presenters/interfaces-redux'
import BoardActions from './BoardActions'
import SessionActions from './SessionActions'

export default (): IActions => {
  return {
    board: new BoardActions(),
    session: new SessionActions()
  }
}