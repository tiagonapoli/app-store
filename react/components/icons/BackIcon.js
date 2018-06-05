import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class BackIcon extends PureComponent {
  static propTypes = {
    colorFill: PropTypes.string.isRequired,
    className: PropTypes.string,
  }

  render() {
    const { colorFill, className } = this.props
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          className={`fill-${colorFill}`}
          d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"
        />
        <path d="M0-.75h24v24h-24z" fill="none" />
      </svg>
    )
  }
}

export default BackIcon
