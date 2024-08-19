import ITxnCategoryVO from "adapters/domains/vos/interfaces/ITxnCategoryVO"
import ICardInfoVO from "adapters/domains/vos/interfaces/ICardInfoVO"

export default interface ICardTransactionVM {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly createdAt: string
  readonly category: ITxnCategoryVO
  readonly card: ICardInfoVO
  readonly cardId: string
  readonly yearMonthDate: string
  readonly longTime: number
  readonly dayOfWeek: string
  readonly date: number
}
