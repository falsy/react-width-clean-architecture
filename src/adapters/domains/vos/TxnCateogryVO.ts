import ITxnCategoryVO, {
  ITxnCategoryVOParams
} from "./interfaces/ITxnCategoryVO"

export default class TxnCategoryVO implements ITxnCategoryVO {
  readonly id: string
  readonly name: string
  readonly description: string

  constructor(params: ITxnCategoryVOParams) {
    this.id = params.id
    this.name = params.name
    this.description = params.description
  }
}
