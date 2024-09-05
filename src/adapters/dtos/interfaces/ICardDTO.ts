export interface ICardDTOParams {
  readonly id: string
  readonly card_type: "CREDIT" | "DEBIT"
  readonly card_company: string
  readonly card_number: string
  readonly branch: string
  readonly created_at: string
}

export default interface ICardDTO {
  readonly id: string
  readonly cardType: "CREDIT" | "DEBIT"
  readonly cardCompany: string
  readonly cardNumber: string
  readonly branch: string
  readonly createdAt: string
}
