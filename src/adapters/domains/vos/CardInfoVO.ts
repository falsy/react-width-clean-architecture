import ICard from "../entities/interfaces/ICard"
import ICardInfoVO from "./interfaces/ICardInfoVO"

export default class CardInfoVO implements ICardInfoVO {
  readonly cardType: "CREDIT" | "DEBIT"
  readonly cardCompany: string
  readonly cardNumber: string

  constructor(params: ICard) {
    this.cardType = params.cardType
    this.cardCompany = params.cardCompany
    this.cardNumber = params.cardNumber
  }
}
