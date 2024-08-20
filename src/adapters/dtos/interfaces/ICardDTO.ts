export interface ICardDTOParams {
  id: string
  cardType: "CREDIT" | "DEBIT"
  cardCompany: string
  cardNumber: string
}

export default interface ICardDTO {
  readonly id: string
  readonly cardType: "CREDIT" | "DEBIT"
  readonly cardCompany: string
  readonly cardNumber: string
}
