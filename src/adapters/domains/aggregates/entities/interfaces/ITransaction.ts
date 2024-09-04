export interface ITransactionParams {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly franchiseId?: string
  readonly cardId?: string
  readonly accountId?: string
  readonly createdAt: string
}

export default interface ITransaction {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly franchiseId?: string
  readonly cardId?: string
  readonly accountId?: string
  readonly createdAt: string
}
