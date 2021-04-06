import IConverter from './interfaces-converters'
import { IActions } from './interfaces-redux'
import IRepositories from '../repositories/interfaces'
import BoardPresenter from './BoardPre'
import IPresenters from './interfaces'
import SessionPresenter from './SessionPre'

export default (repositories: IRepositories, actions: IActions, converter: IConverter): IPresenters => {
  return {
    session: new SessionPresenter(repositories.session, actions.session),
    board: new BoardPresenter(repositories.board, actions.board, converter.board)
  }
}