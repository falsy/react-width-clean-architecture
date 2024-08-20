import { IsString } from "class-validator"
import ICard from "../entities/interfaces/ICard"
import ICardInfoVO from "./interfaces/ICardInfoVO"

export default class CardInfoVO implements ICardInfoVO {
  @IsString()
  readonly cardType: "CREDIT" | "DEBIT"

  @IsString()
  readonly cardCompany: string

  @IsString()
  readonly cardNumber: string

  constructor(params: ICard) {
    this.cardType = params.cardType
    this.cardCompany = params.cardCompany
    this.cardNumber = params.cardNumber
  }
}
