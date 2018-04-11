import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default function withCulture() {
  return WrappedComponent => {
    class WithCultureWrapper extends Component {
      render() {
        return (
          <WrappedComponent {...this.props} culture={this.context.culture} />
        )
      }
    }

    WithCultureWrapper.contextTypes = {
      culture: PropTypes.object,
    }

    return WithCultureWrapper
  }
}
