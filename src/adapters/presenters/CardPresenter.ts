import ICardPresenter from "./interfaces/ICardPresenter"
import ICardUseCase from "adapters/domains/useCases/interfaces/ICardUseCase"
import ICard from "adapters/domains/entities/interfaces/ICard"

export default class CardPresenter implements ICardPresenter {
  constructor(private cardUseCase: ICardUseCase) {}

  getCards(): Promise<ICard[]> {
    return this.cardUseCase.getCards()
  }
}
