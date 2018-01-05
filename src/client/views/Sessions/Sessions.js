import React, { Component } from 'react'
import { get, map } from 'lodash'
import { connect } from 'react-redux'

import { listSessions } from 'actions/sessions'

import Link from 'components/Link'
import SessionGrid from 'components/SessionGrid'

class Sessions extends Component {
  state = {
    selectedView: 'grid',
  }

  componentWillMount() {
    return this.props.listSessions()
  }

  selectView = view => this.setState({ selectedView: view })

  render() {
    const { sessions, error, isLoading } = this.props
    const { selectedView } = this.state

    if (error) {
      return (<div>Un erreur est survenue</div>)
    }

    return (
      <div>
        <div>
          <a onClick={() => this.selectView('grid')}>Afficher en grille</a>
          <a onClick={() => this.selectView('list')}>Afficher en liste</a>
        </div>
        { selectedView === 'grid' &&
          <SessionGrid
            sessions={sessions}
            isLoading={isLoading}
          />
        }
        { selectedView === 'list' &&
          <ul>
            {map(sessions, session => (<li key={session.id}><Link to={`/sessions/${session.id}`}>{session.title}</Link></li>))}
          </ul>
        }
      </div>
    )
  }
}

export default connect(
  state => ({
    sessions: get(state, 'sessions.list.items'),
    isLoading: get(state, 'sessions.list.isLoading'),
    error: get(state, 'sessions.list.error'),
  }),
  {
    listSessions,
  }
)(Sessions)
