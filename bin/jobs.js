import jobs from '../src/server/jobs'
import db from '../src/server/init/database'

import ContextService from '../src/server/services/Context.service'

const [nodeCommand, jobsScript, action, ...args] = process.argv // eslint-disable-line no-unused-vars

const context = new ContextService('jobs')

if (jobs[action]) {
  jobs[action].execute(context, db)(...args)
}
