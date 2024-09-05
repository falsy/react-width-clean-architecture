export interface IAccountDTOParams {
  readonly id: string
  readonly account_type: "SAVINGS" | "CURRENT"
  readonly bank_name: string
  readonly account_number: string
  readonly balance: number
  readonly branch: string
  readonly created_at: string
}

export default interface IAccountDTO {
  readonly id: string
  readonly accountType: "SAVINGS" | "CURRENT"
  readonly bankName: string
  readonly accountNumber: string
  readonly balance: number
  readonly branch: string
  readonly createdAt: string
}
