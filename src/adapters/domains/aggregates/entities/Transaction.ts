import ITransaction, { ITransactionParams } from "./interfaces/ITransaction"

export default class Transaction implements ITransaction {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly franchiseId?: string
  readonly cardId?: string
  readonly accountId?: string
  readonly createdAt: string

  constructor(params: ITransactionParams) {
    this.id = params.id
    this.amount = params.amount
    this.keyword = params.keyword
    if (params.franchiseId) this.franchiseId = params.franchiseId
    if (params.cardId) this.cardId = params.cardId
    if (params.accountId) this.accountId = params.accountId
    this.createdAt = params.createdAt
  }
}
