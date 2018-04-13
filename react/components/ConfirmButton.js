import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@vtex/styleguide/lib/Button'

class ConfirmButton extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
  }

  handleClick = () => {}

  render() {
    const { value } = this.props
    return (
      <div className="bg-rebel-pink tc br2 w-100">
        <Button onClick={this.handleClick}>
          <span className="white">{value}</span>
        </Button>
      </div>
    )
  }
}

export default ConfirmButton
