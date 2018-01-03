import _ from 'lodash'

class Ability {
  constructor(user) {
    this.user = user
    this.permissions = []
    if (user) {
      this.can('user', 'list')
      this.can('user', 'read')
      this.can('user', 'read-all', { id: user.id })
      this.can('user', 'update', { id: user.id })
      this.can('session', 'list')
      this.can('session', 'read')
      this.can('track', 'list')
    }
    if (user && user.status === 'admin') {
      this.can('*', '*')
    }
  }

  can(model, operation, payload) {
    this.permissions.push({ model, operation, payload })
  }

  check(action, object) {
    const [model, operation] = action.split(':')
    return _.some(
      this.permissions,
      permission => {
        if (permission.model !== model && permission.model !== '*') return false
        if (permission.operation !== operation && permission.operation !== '*') return false
        if (permission.payload) {
          return _.isMatch(object, permission.payload)
        }
        return true
      }
    )
  }
}

export default Ability
