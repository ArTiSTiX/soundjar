import { Forbidden, NotAuthorized } from '../errors'

class ContextService {
  constructor(origin = 'api', user) {
    this.origin = origin
    this.user = user
  }

  can(/* action, object = null */) {
    if (this.origin !== 'api') { return true }
    return true // TODO
  }

  authorize(action, object) {
    if (this.origin !== 'api') { return }
    if (this.can(action, object)) {
      return
    }

    if (this.user) {
      throw new NotAuthorized()
    }

    throw new Forbidden(`Cannot ${action}`)
  }
}

export default ContextService
