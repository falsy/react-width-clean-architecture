import BoardConverter from './BoardConv'
import IConverter from '../../adapters/presenters/converter-interfaces'

export default (): IConverter => {
  return {
    board: new BoardConverter()
  }
}