export interface IRequestTransactionParams {
  readonly amount: number
  readonly keyword: string
  readonly franchiseId: string
  readonly cardId?: string
  readonly accountId?: string
}
