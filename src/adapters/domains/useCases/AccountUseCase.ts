import { validateOrReject } from "class-validator"
import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"
import LayerDTO from "adapters/dtos/LayerDTO"
import IAccountDTO from "adapters/dtos/interfaces/IAccountDTO"
import IAccountUseCase from "./interfaces/IAccountUseCase"
import IAccount from "../entities/interfaces/IAccount"
import Account from "../entities/Account"

export default class AccountUseCase implements IAccountUseCase {
  constructor(private accountRepository: IAccountUseCase) {}

  async getAccounts(): Promise<ILayerDTO<IAccount[]>> {
    try {
      const { isError, message, data } =
        await this.accountRepository.getAccounts()

      if (isError || !data) {
        return {
          isError,
          message
        }
      }

      const accounts = await Promise.all(
        data.map(async (accountDTO: IAccountDTO) => {
          const account = new Account({
            id: accountDTO.id,
            accountType: accountDTO.accountType,
            bankName: accountDTO.bankName,
            accountNumber: accountDTO.accountNumber,
            balance: accountDTO.balance
          })
          await validateOrReject(account)
          return account
        })
      )

      return new LayerDTO({
        data: accounts
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
