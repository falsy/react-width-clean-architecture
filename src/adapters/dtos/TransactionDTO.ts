import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator"
import ITransactionDTO, {
  ITransactionDTOParams
} from "./interfaces/ITransactionDTO"
import ILocationVO from "adapters/domains/vos/interfaces/ILocationVO"

export default class TransactionDTO implements ITransactionDTO {
  @IsString()
  readonly id: string

  @IsNumber()
  readonly amount: number

  @IsString()
  readonly keyword: string

  @IsString()
  readonly categoryId: string

  @IsOptional()
  @IsString()
  readonly cardId?: string

  @IsOptional()
  @IsString()
  readonly accountId?: string

  @ValidateNested()
  readonly location: ILocationVO

  @IsString()
  readonly updatedAt: string

  @IsString()
  readonly createdAt: string

  constructor(params: ITransactionDTOParams) {
    this.id = params.id
    this.amount = params.amount
    this.keyword = params.keyword
    this.categoryId = params.category_id
    this.cardId = params.card_id
    this.accountId = params.account_id
    this.location = params.location
    this.updatedAt = params.updated_at
    this.createdAt = params.created_at
  }
}
