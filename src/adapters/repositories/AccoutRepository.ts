import LayerDTO from "adapters/dtos/LayerDTO"
import IClientHTTP from "adapters/infrastructures/interfaces/IClientHTTP"
import { validateOrReject } from "class-validator"
import { API_URI } from "constants/networks"
import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"
import IAccountRepository from "./interfaces/IAccountRepository"
import IAccountDTO, {
  IAccountDTOParams
} from "adapters/dtos/interfaces/IAccountDTO"
import AccountDTO from "adapters/dtos/AccountDTO"

export default class AccountRepository implements IAccountRepository {
  constructor(private clientHttp: IClientHTTP) {}

  async getAccounts(): Promise<ILayerDTO<IAccountDTO[]>> {
    try {
      const res = await this.clientHttp.get(`${API_URI}/api/accounts`)
      const { isError, message, data } = res.data

      if (isError) {
        return new LayerDTO({
          isError,
          message
        })
      }

      const accountDTOs = await Promise.all(
        data.map(async (account: IAccountDTOParams) => {
          const accountDTO = new AccountDTO(account)
          await validateOrReject(accountDTO)
          return accountDTO
        })
      )

      return new LayerDTO({
        data: accountDTOs
      })
    } catch (error) {
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error("Unknown error type")
      }
    }
  }
}
