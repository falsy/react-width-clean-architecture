import { IsString } from "class-validator"
import ITxnCategoryDTO, {
  ITxnCategoryDTOParams
} from "./interfaces/ITxnCategoryDTO"

export default class TxnCategoryDTO implements ITxnCategoryDTO {
  @IsString()
  readonly id: string

  @IsString()
  readonly name: string

  @IsString()
  readonly description: string

  constructor(params: ITxnCategoryDTOParams) {
    this.id = params.id
    this.name = params.name
    this.description = params.description
  }
}
