import { IBoardRepository } from './iBoardRepo';
import { ISessionRepository } from './iSessionRepo'

export default interface IRepositories {
  session: ISessionRepository
  board: IBoardRepository
}