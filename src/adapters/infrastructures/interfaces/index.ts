import { IHttp } from './iHttp'
import { IStorage } from './iStorage'

export default interface IInfrastructures {
  http: IHttp
  storage: IStorage
}