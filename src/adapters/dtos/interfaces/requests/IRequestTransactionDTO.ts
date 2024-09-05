export interface ICreateTxnParams {
  readonly amount: number
  readonly keyword: string
  readonly cardId?: string
  readonly accountId?: string
}

export interface IFilterTxnParams {
  readonly year?: number
  readonly month?: number
  readonly type?: "CARD" | "ACCOUNT"
}
