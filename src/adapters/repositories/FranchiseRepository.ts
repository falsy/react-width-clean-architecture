import { validateOrReject } from "class-validator"
import { API_URI } from "constants/networks"
import IFranchiseRepository from "./interfaces/IFranchiseRepository"
import IFranchiseDTO, {
  IFranchiseDTOParams
} from "adapters/dtos/interfaces/IFranchiseDTO"
import IClientHTTP from "adapters/infrastructures/interfaces/IClientHTTP"
import FranchiseDTO from "adapters/dtos/FranchiseDTO"

export default class FranchiseRepository implements IFranchiseRepository {
  constructor(private clientHttp: IClientHTTP) {}

  async getFranchises(): Promise<IFranchiseDTO[]> {
    try {
      const res = await this.clientHttp.get(`${API_URI}/api/franchises`)

      if (res.status !== 200) {
        throw new Error("Error occurred while fetching data")
      }

      const franchiseDTOs = await Promise.all(
        res.data.map(async (franchise: IFranchiseDTOParams) => {
          const franchiseDTO = new FranchiseDTO(franchise)
          await validateOrReject(franchiseDTO)
          return franchiseDTO
        })
      )

      return franchiseDTOs
    } catch (error) {
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error("Unknown error type")
      }
    }
  }
}
