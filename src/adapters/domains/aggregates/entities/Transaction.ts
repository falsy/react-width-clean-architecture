import ITxnCategoryVO from "../../vos/interfaces/ITxnCategoryVO"
import ITransaction, { ITransactionParams } from "./interfaces/ITransaction"

export default class Transaction implements ITransaction {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly createdAt: string
  readonly category: ITxnCategoryVO

  constructor(params: ITransactionParams) {
    this.id = params.id
    this.amount = params.amount
    this.keyword = params.keyword
    this.createdAt = params.createdAt
    this.category = params.category
  }
}
