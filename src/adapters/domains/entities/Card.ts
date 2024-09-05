import ICard, { ICardParams } from "./interfaces/ICard"

export default class Card implements ICard {
  readonly id: string
  readonly cardType: "CREDIT" | "DEBIT"
  readonly cardCompany: string
  readonly cardNumber: string
  readonly branch: string

  constructor(params: ICardParams) {
    this.id = params.id
    this.cardType = params.cardType
    this.cardCompany = params.cardCompany
    this.cardNumber = params.cardNumber
    this.branch = params.branch
  }
}
