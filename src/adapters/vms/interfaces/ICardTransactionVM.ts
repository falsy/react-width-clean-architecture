import ITxnCategoryVO from "adapters/domains/vos/interfaces/ITxnCategoryVO"
import ICard from "adapters/domains/entities/interfaces/ICard"

export default interface ICardTransactionVM {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly createdAt: string
  readonly category: ITxnCategoryVO
  readonly card: ICard
  readonly longTime: number
  readonly dayOfWeek: string
  readonly date: number
}
