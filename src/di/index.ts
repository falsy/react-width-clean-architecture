/* eslint-disable react-hooks/rules-of-hooks */
import ClientHTTP from "adapters/infrastructures/ClientHTTP"
import repositoriesFn from "adapters/repositories"
import useCasesFn from "adapters/domains/useCases"
import presentersFn from "adapters/presenters"

const clientHttp = new ClientHTTP()
const repositories = repositoriesFn(clientHttp)
const useCases = useCasesFn(repositories)
const presenters = presentersFn(useCases)

export default presenters
