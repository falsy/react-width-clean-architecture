import { ReactNode } from "react"
import infrastructuresFn from "adapters/infrastructures"
import repositoriesFn from "adapters/repositories"
import useCasesFn from "adapters/domains/useCases"
import presentersFn from "adapters/presenters"
import { DependencyContext } from "./DependencyContext"

export default function DependencyProvider({
  children
}: {
  children: ReactNode
}) {
  const infrastructures = infrastructuresFn()
  const repositories = repositoriesFn(infrastructures.clientHTTP)
  const useCases = useCasesFn(repositories)
  const presenters = presentersFn(useCases)

  const dependencies = {
    presenters
  }

  return (
    <DependencyContext.Provider value={dependencies}>
      {children}
    </DependencyContext.Provider>
  )
}
