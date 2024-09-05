import IAccountInfoVO from "adapters/domains/vos/interfaces/IAccountInfoVO"

export default interface IAccountTransactionVM {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly account: IAccountInfoVO
  readonly longTime: number
  readonly date: string
}
