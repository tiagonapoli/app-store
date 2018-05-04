import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BillingInfo extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    store: PropTypes.string.isRequired,
    pictureUrl: PropTypes.string,
  }

  initials = () => {
    const { name } = this.props
    const [firstName, lastName] = name ? name.split(' ') : []
    return firstName && lastName
      ? (firstName[0] + lastName[0]).toUpperCase()
      : firstName.slice(0, 1).toUpperCase()
  }

  render() {
    const { name, email, pictureUrl, store } = this.props
    return (
      <div className="flex items-center c-base-8">
        <div
          title={name}
          className="flex-shrink-none flex items-center justify-center billing-img br-100 pa0 ba bw1 b--base-1 overflow-x-hidden"
        >
          {pictureUrl ? (
            <img src={pictureUrl} alt={name} />
          ) : (
            <span className="ttu f5 fw5 c-brand--dark">{this.initials()}</span>
          )}
        </div>
        <div className="flex flex-column ml4">
          <div className="fw5 f5 ttc">{store}</div>
          <div className="flex items-center flex-wrap f6">
            <span className="db c-base-7">{name.split(' ')[0]}</span>
            <div className="flex items-center f9 c-base-4 mh2">&#9679;</div>
            <span className="db b--base-1 bl c-base-7">{email}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default BillingInfo
