import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Profile extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
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
    const { name, store, pictureUrl } = this.props
    return (
      <div className="flex items-center c-base-1">
        <span className="dn-s db-ns mr3">{name}</span>
        <span className="dn-s db-ns pl3 mr5 b--base-1 bl ttc">{store}</span>
        <button
          title={name}
          className="link flex-shrink-none flex items-center justify-center h2 w2 pointer br-100 pa0 ba bw1 b--base-1 bg-base-1 overflow-x-hidden"
        >
          {pictureUrl ? (
            <img src={pictureUrl} alt={name} />
          ) : (
            <span className="ttu f5 fw5 c-brand--dark">{this.initials()}</span>
          )}
        </button>
      </div>
    )
  }
}

export default Profile
