import BoardConverter from './BoardConv'
import IConverter from '../../adapters/presenters/interfaces-converters'

export default (): IConverter => {
  return {
    board: new BoardConverter()
  }
}