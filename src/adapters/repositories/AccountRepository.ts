import { validateOrReject } from "class-validator"
import { API_URI } from "constants/networks"
import IAccountRepository from "./interfaces/IAccountRepository"
import IAccountDTO, {
  IAccountDTOParams
} from "adapters/dtos/interfaces/IAccountDTO"
import IClientHTTP from "adapters/infrastructures/interfaces/IClientHTTP"
import AccountDTO from "adapters/dtos/AccountDTO"

export default class AccountRepository implements IAccountRepository {
  constructor(private clientHttp: IClientHTTP) {}

  async getAccounts(): Promise<IAccountDTO[]> {
    try {
      const res = await this.clientHttp.get(`${API_URI}/api/accounts`)

      if (res.status !== 200) {
        throw new Error("Error occurred while fetching data")
      }

      const accountDTOs = await Promise.all(
        res.data.map(async (account: IAccountDTOParams) => {
          const accountDTO = new AccountDTO(account)
          await validateOrReject(accountDTO)
          return accountDTO
        })
      )

      return accountDTOs
    } catch (error) {
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error("Unknown error type")
      }
    }
  }
}
