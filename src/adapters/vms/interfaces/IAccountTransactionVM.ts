import ITxnCategoryVO from "adapters/domains/vos/interfaces/ITxnCategoryVO"
import IAccount from "adapters/domains/entities/interfaces/IAccount"

export default interface IAccountTransactionVM {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly createdAt: string
  readonly category: ITxnCategoryVO
  readonly account: IAccount
  readonly longTime: number
  readonly dayOfWeek: string
  readonly date: number
}
