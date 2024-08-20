export interface IAccountParams {
  id: string
  accountType: "SAVINGS" | "CURRENT"
  bankName: string
  accountNumber: string
  balance: number
}

export default interface IAccount {
  readonly id: string
  readonly accountType: "SAVINGS" | "CURRENT"
  readonly bankName: string
  readonly accountNumber: string
  readonly balance: number
}
