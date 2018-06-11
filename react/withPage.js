import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default function withPage() {
  return WrappedComponent => {
    class WithPageWrapper extends Component {
      render() {
        return (
          <WrappedComponent
            {...this.props}
            page={this.context.page}
          />
        )
      }
    }

    WithPageWrapper.contextTypes = {
      page: PropTypes.string,
    }

    return WithPageWrapper
  }
}
