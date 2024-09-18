import ClientHTTP from "./ClientHTTP"
import { IInfrastructures } from "./interfaces"

export default function infrastructures(): IInfrastructures {
  return {
    clientHTTP: new ClientHTTP()
  }
}
