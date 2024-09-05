import { validateOrReject } from "class-validator"
import { API_URI } from "constants/networks"
import IClientHTTP from "adapters/infrastructures/interfaces/IClientHTTP"
import IUserRepository from "./interfaces/IUserRepository"
import IUserDTO from "adapters/dtos/interfaces/IUserDTO"
import UserDTO from "adapters/dtos/UserDTO"

class UserRepository implements IUserRepository {
  constructor(private clientHttp: IClientHTTP) {}

  async getUser(): Promise<IUserDTO> {
    try {
      const res = await this.clientHttp.get(`${API_URI}/api/user`)

      if (res.status !== 200) {
        throw new Error("Error occurred while fetching data")
      }

      const userDTO = new UserDTO(res.data)
      await validateOrReject(userDTO)

      return userDTO
    } catch (error) {
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error("Unknown error type")
      }
    }
  }
}

export default UserRepository
