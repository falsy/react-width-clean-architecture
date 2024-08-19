import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"
import LayerDTO from "adapters/dtos/LayerDTO"
import IClientHTTP from "adapters/infrastructures/interfaces/IClientHTTP"
import IUserRepository from "./interfaces/IUserRepository"
import { API_URI } from "constants/networks"
import { validateOrReject } from "class-validator"
import UserInfoDTO from "adapters/dtos/UserInfoDTO"
import IUserInfoDTO from "adapters/dtos/interfaces/IUserInfoDTO"

class UserRepository implements IUserRepository {
  constructor(private clientHttp: IClientHTTP) {}

  async getUserInfo(): Promise<ILayerDTO<IUserInfoDTO>> {
    try {
      const res = await this.clientHttp.get(`${API_URI}/api/user`)
      const { isError, message, data } = res.data

      if (isError) {
        return new LayerDTO({
          isError,
          message
        })
      }

      const userInfoDTO = new UserInfoDTO(data)

      await validateOrReject(userInfoDTO)

      return new LayerDTO({
        data: userInfoDTO
      })
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "Unknown error type"
      )
      throw error
    }
  }
}

export default UserRepository
