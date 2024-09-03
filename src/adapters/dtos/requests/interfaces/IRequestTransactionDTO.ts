export interface IRequestTransactionDTOParams {
  readonly amount: number
  readonly keyword: string
  readonly categoryId: string
  readonly cardId?: string
  readonly accountId?: string
}

export default interface IRequestTransactionDTO {
  readonly amount: number
  readonly keyword: string
  readonly categoryId: string
  readonly cardId?: string
  readonly accountId?: string
}
