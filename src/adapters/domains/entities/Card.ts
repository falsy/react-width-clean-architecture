import { IsString } from "class-validator"
import ICard, { ICardParams } from "./interfaces/ICard"

export default class Card implements ICard {
  @IsString()
  readonly id: string

  @IsString()
  readonly cardType: "CREDIT" | "DEBIT"

  @IsString()
  readonly cardCompany: string

  @IsString()
  readonly cardNumber: string

  constructor(params: ICardParams) {
    this.id = params.id
    this.cardType = params.cardType
    this.cardCompany = params.cardCompany
    this.cardNumber = params.cardNumber
  }
}
