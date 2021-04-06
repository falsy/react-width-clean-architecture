import IInfrastructures from '../infrastructures/interfaces'
import BoardRepository from './BoardRepo'
import IRepositories from './interfaces'
import SessionRepository from './SessionRepo'

export default (infrastructures: IInfrastructures): IRepositories => {
  return {
    session: new SessionRepository(infrastructures.http, infrastructures.storage),
    board: new BoardRepository(infrastructures.http)
  }
}