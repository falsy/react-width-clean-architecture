import IConverter from './interfaces-converters'
import IRepositories from '../repositories/interfaces'
import BoardPresenter from './BoardPre'
import IPresenters from './interfaces'
import SessionPresenter from './SessionPre'

export default (repositories: IRepositories, converter: IConverter): IPresenters => {
  return {
    session: new SessionPresenter(repositories.session),
    board: new BoardPresenter(repositories.board, converter.board)
  }
}