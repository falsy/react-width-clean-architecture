import ITxnCategoryVO from "adapters/domains/vos/interfaces/ITxnCategoryVO"

export interface ITransactionParams {
  id: string
  amount: number
  keyword: string
  createdAt: string
  category: ITxnCategoryVO
}

export default interface ITransaction {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly createdAt: string
  readonly category: ITxnCategoryVO
}
