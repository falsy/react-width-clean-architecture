export interface IAccountDTOParams {
  id: string
  accountType: "SAVINGS" | "CURRENT"
  bankName: string
  accountNumber: string
  balance: number
}

export default interface IAccountDTO {
  readonly id: string
  readonly accountType: "SAVINGS" | "CURRENT"
  readonly bankName: string
  readonly accountNumber: string
  readonly balance: number
}
