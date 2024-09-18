import { createContext } from "react"
import presenters from "adapters/presenters"

interface IDependencies {
  presenters: ReturnType<typeof presenters>
}

export const DependencyContext = createContext<IDependencies | null>(null)
