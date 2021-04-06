import infrastructures from '../adapters/infrastructures'
import repositories from '../adapters/repositories'
import presenter from '../adapters/presenters'
import actions from '../services/redux/actions'
import converters from '../services/converters'

const cInfrastructures = infrastructures()
const cRepositorires = repositories(cInfrastructures)
const cActions = actions()
const cConverters = converters()

export default presenter(cRepositorires, cActions, cConverters)