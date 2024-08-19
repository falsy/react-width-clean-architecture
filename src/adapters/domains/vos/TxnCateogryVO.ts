import { IsString } from "class-validator"
import ITxnCategoryVO, {
  ITxnCategoryVOParams
} from "./interfaces/ITxnCategoryVO"

export default class TxnCategoryVO implements ITxnCategoryVO {
  @IsString()
  readonly id: string

  @IsString()
  readonly name: string

  @IsString()
  readonly description: string

  constructor(params: ITxnCategoryVOParams) {
    this.id = params.id
    this.name = params.name
    this.description = params.description
  }
}
