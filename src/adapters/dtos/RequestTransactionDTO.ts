import { IsNumber, IsOptional, IsString } from "class-validator"
import IRequestTransactionDTO from "./interfaces/IRequestTransactionDTO"

export default class RequestTransactionDTO implements IRequestTransactionDTO {
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

  constructor(params: IRequestTransactionDTO) {
    this.amount = params.amount
    this.keyword = params.keyword
    this.categoryId = params.categoryId
    this.cardId = params.cardId
    this.accountId = params.accountId
  }
}
