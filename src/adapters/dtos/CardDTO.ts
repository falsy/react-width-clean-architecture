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

  @IsString()
  readonly branch: string

  @IsString()
  readonly createdAt: string

  constructor(params: ICardDTOParams) {
    this.id = params.id
    this.cardType = params.card_type
    this.cardCompany = params.card_company
    this.cardNumber = params.card_number
    this.branch = params.branch
    this.createdAt = params.created_at
  }
}
