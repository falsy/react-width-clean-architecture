import { IBoardPresenter } from './iBoardPre'
import { ISessionPresenter } from './iSessionPre'

export default interface IPresenters {
  session: ISessionPresenter
  board: IBoardPresenter
}