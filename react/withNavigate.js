import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default function withNavigate() {
  return WrappedComponent => {
    class WithNavigateWrapper extends Component {
      render() {
        return (
          <WrappedComponent {...this.props} navigate={this.context.navigate} />
        )
      }
    }

    WithNavigateWrapper.contextTypes = {
      navigate: PropTypes.func,
    }

    return WithNavigateWrapper
  }
}
