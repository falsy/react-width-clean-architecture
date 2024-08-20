export interface ITransactionDTOParams {
  id: string
  amount: number
  keyword: string
  categoryId: string
  cardId?: string
  accountId?: string
  createdAt: string
}

export default interface ITransactionDTO {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly categoryId: string
  readonly cardId?: string
  readonly accountId?: string
  readonly createdAt: string
}
