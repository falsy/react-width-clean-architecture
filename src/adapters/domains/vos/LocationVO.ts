import ILocationVO from "./interfaces/ILocationVO"

export default class LocationVO implements ILocationVO {
  readonly name: string
  readonly latitude: number
  readonly longitude: number

  constructor(params: ILocationVO) {
    this.name = params.name
    this.latitude = params.latitude
    this.longitude = params.longitude
  }
}
