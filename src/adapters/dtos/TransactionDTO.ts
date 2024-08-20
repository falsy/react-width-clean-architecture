import { IsNumber, IsOptional, IsString } from "class-validator"
import ITransactionDTO, {
  ITransactionDTOParams
} from "./interfaces/ITransactionDTO"

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

  @IsString()
  readonly createdAt: string

  constructor(params: ITransactionDTOParams) {
    this.id = params.id
    this.amount = params.amount
    this.keyword = params.keyword
    this.categoryId = params.categoryId
    this.cardId = params.cardId
    this.accountId = params.accountId
    this.createdAt = params.createdAt
  }
}
