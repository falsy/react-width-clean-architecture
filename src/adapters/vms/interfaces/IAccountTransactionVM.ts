import IAccount from "adapters/domains/entities/interfaces/IAccount"

export default interface IAccountTransactionVM {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly account: IAccount
  readonly longTime: number
  readonly date: string
}
