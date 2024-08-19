export interface IRequestTransactionDTOParams {
  amount: number
  keyword: string
  categoryId: string
  cardId?: string
  accountId?: string
}

export default interface IRequestTransactionDTO {
  readonly amount: number
  readonly keyword: string
  readonly categoryId: string
  readonly cardId?: string
  readonly accountId?: string
}
