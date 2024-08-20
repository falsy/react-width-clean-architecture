export interface ICardParams {
  id: string
  cardType: "CREDIT" | "DEBIT"
  cardCompany: string
  cardNumber: string
}

export default interface ICard {
  readonly id: string
  readonly cardType: "CREDIT" | "DEBIT"
  readonly cardCompany: string
  readonly cardNumber: string
}
