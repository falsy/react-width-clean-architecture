import IInfrastructures from './interfaces'
import Http from './Http'
import Storage from './Storage'

export default (): IInfrastructures => {
  return {
    http: new Http(),
    storage: new Storage()
  }
}