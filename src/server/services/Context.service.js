import { Forbidden, Unauthorized } from '../errors'
import Ability from '../ability'

class ContextService {
  constructor(origin = 'api', user) {
    this.origin = origin
    this.user = user
    this.ability = new Ability(user)
  }

  can(action, object = null) {
    if (this.origin !== 'api') { return true }
    return this.ability.check(action, object)
  }

  authorize(action, object) {
    if (this.origin !== 'api') { return object }
    if (this.can(action, object)) {
      return object
    }

    if (this.user) {
      throw new Unauthorized()
    }

    throw new Forbidden(`Cannot ${action}`)
  }
}

export default ContextService
