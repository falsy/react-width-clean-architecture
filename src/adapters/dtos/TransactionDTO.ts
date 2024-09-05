import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator"
import ITransactionDTO, {
  ITransactionDTOParams
} from "./interfaces/ITransactionDTO"
import ILocationVO from "adapters/domains/vos/interfaces/ILocationVO"
import LocationVO from "adapters/domains/vos/LocationVO"

export default class TransactionDTO implements ITransactionDTO {
  @IsString()
  readonly id: string

  @IsNumber()
  readonly amount: number

  @IsString()
  readonly keyword: string

  @IsOptional()
  @IsString()
  readonly franchiseId?: string

  @IsOptional()
  @IsString()
  readonly cardId?: string

  @IsOptional()
  @IsString()
  readonly accountId?: string

  @IsOptional()
  @ValidateNested()
  readonly location?: ILocationVO

  @IsString()
  readonly updatedAt: string

  @IsString()
  readonly createdAt: string

  constructor(params: ITransactionDTOParams) {
    this.id = params.id
    this.amount = params.amount
    this.keyword = params.keyword
    if (params.franchise_id) this.franchiseId = params.franchise_id
    if (params.card_id) this.cardId = params.card_id
    if (params.account_id) this.accountId = params.account_id
    if (params.location) this.location = new LocationVO(params.location)
    this.updatedAt = params.updated_at
    this.createdAt = params.created_at
  }
}
