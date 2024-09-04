import IAccountInfoVO from "adapters/domains/vos/interfaces/IAccountInfoVO"

export default interface IAccountTransactionVM {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly createdAt: string
  readonly account: IAccountInfoVO
  readonly yearMonthDate: string
  readonly longTime: number
  readonly dayOfWeek: string
  readonly date: number
}
