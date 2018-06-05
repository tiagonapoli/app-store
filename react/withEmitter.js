import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default function withEmitter() {
  return WrappedComponent => {
    class WithEmitterhWrapper extends Component {
      render() {
        return (
          <WrappedComponent
            {...this.props}
            emitter={this.context.emitter}
          />
        )
      }
    }

    WithEmitterhWrapper.contextTypes = {
      emitter: PropTypes.object,
    }

    return WithEmitterhWrapper
  }
}
