import ICardDTO from "adapters/dtos/interfaces/ICardDTO"
import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"

export default interface ICardRepository {
  getCards(): Promise<ILayerDTO<ICardDTO[]>>
}
