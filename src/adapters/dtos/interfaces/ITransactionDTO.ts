import ILocationVO from "adapters/domains/vos/interfaces/ILocationVO"

export interface ITransactionDTOParams {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly franchise_id: string
  readonly card_id?: string
  readonly account_id?: string
  readonly location: ILocationVO
  readonly updated_at: string
  readonly created_at: string
}

export default interface ITransactionDTO {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly franchiseId: string
  readonly cardId?: string
  readonly accountId?: string
  readonly location: ILocationVO
  readonly createdAt: string
  readonly updatedAt: string
}
