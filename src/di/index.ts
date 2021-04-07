import infrastructures from '../adapters/infrastructures'
import repositories from '../adapters/repositories'
import presenter from '../adapters/presenters'
import converters from '../services/converters'

const cInfrastructures = infrastructures()
const cRepositorires = repositories(cInfrastructures)
const cConverters = converters()

export default presenter(cRepositorires, cConverters)