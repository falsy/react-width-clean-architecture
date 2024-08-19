import { IsNumber, IsString, ValidateNested } from "class-validator"
import ITransaction, { ITransactionParams } from "./interfaces/ITransaction"
import ITxnCategoryVO from "../vos/interfaces/ITxnCategoryVO"

export default abstract class Transaction implements ITransaction {
  @IsString()
  readonly id: string

  @IsNumber()
  readonly amount: number

  @IsString()
  readonly keyword: string

  @IsString()
  readonly createdAt: string

  @ValidateNested()
  readonly category: ITxnCategoryVO

  constructor(params: ITransactionParams) {
    this.id = params.id
    this.amount = params.amount
    this.keyword = params.keyword
    this.createdAt = params.createdAt
    this.category = params.category
  }
}
