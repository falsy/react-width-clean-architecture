export default interface IAccountInfoVO {
  readonly accountType: "SAVINGS" | "CURRENT"
  readonly bankName: string
  readonly accountNumber: string
  readonly balance: number
}
