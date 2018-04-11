import React, { Component } from 'react'
import PropTypes from 'prop-types'

import GetButton from './GetButton'

class ProductDescription extends Component {
  static propTypes = {
    description: PropTypes.string.isRequired,
  }

  render() {
    const { description } = this.props
    return (
      <div className="mh6-s mh0-ns near-black f5">
        <div className="pb10-ns">
          {description}
          {description}
          {description}
          {description}
        </div>
        <div className="bottom-0 ma4 z-2 db-s dn-ns b--white get-button-shadow">
          <GetButton />
        </div>
      </div>
    )
  }
}

export default ProductDescription
