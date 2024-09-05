import IFranchise, { IFranchiseParams } from "./interfaces/IFranchise"

export default class Franchise implements IFranchise {
  readonly id: string
  readonly name: string
  readonly brand: string
  readonly address: string

  constructor(params: IFranchiseParams) {
    this.id = params.id
    this.name = params.name
    this.brand = params.brand
    this.address = params.address
  }
}
