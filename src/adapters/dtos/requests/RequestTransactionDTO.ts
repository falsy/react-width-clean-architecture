import IRequestTransactionDTO from "./interfaces/IRequestTransactionDTO"

export default class RequestTransactionDTO implements IRequestTransactionDTO {
  readonly amount: number
  readonly keyword: string
  readonly categoryId: string
  readonly cardId?: string
  readonly accountId?: string

  constructor(params: IRequestTransactionDTO) {
    this.amount = params.amount
    this.keyword = params.keyword
    this.categoryId = params.categoryId
    this.cardId = params.cardId
    this.accountId = params.accountId
  }
}
