import { IsString } from "class-validator"
import ICardDTO, { ICardDTOParams } from "./interfaces/ICardDTO"

export default class CardDTO implements ICardDTO {
  @IsString()
  readonly id: string

  @IsString()
  readonly cardType: "CREDIT" | "DEBIT"

  @IsString()
  readonly cardCompany: string

  @IsString()
  readonly cardNumber: string

  constructor(params: ICardDTOParams) {
    this.id = params.id
    this.cardType = params.cardType
    this.cardCompany = params.cardCompany
    this.cardNumber = params.cardNumber
  }
}
