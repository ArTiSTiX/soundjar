import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAuthentication } from 'actions/auth'

import Layout from 'components/Layout'

class App extends Component {
  componentWillMount() {
    return this.props.handleAuthentication()
  }

  render() {
    const { auth: { user }, children } = this.props

    return (
      <Layout user={user}>
        {children}
      </Layout>
    )
  }
}

export default connect(
  state => ({
    auth: state.auth,
  }),
  {
    handleAuthentication,
  }
)(App)
