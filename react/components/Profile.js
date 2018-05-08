import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import Icon from '../vendor/vtex.icon'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opened: false,
    }
  }

  static propTypes = {
    intl: intlShape.isRequired,
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

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  handleOptions = () => {
    this.setState(state => {
      return { opened: !state.opened }
    })
  }

  handleMouseDown = e => {
    e.preventDefault()
  }

  handleBlur = () => {
    this.setState({ opened: false })
  }

  handleLogout = () => {
    const path = window && window.location && window.location.href
    this.setState({ opened: false })
    window.location.href = `/admin/logout?redirectUrl=${path}`
  }

  render() {
    const { name, store, pictureUrl } = this.props
    const { opened } = this.state

    return (
      <div className="flex items-center white ph2">
        <span className="dn-s db-ns mr3">{name}</span>
        <span className="dn-s db-ns pl3 mr5 b--white bl ttc">{store}</span>
        <button
          onBlur={this.handleBlur}
          onClick={this.handleOptions}
          title={name}
          className="link flex-shrink-none flex items-center justify-center h2 w2 pointer br-100 pa0 ba bw1 b--white bg-white overflow-x-hidden"
        >
          {pictureUrl ? (
            <img src={pictureUrl} alt={name} />
          ) : (
            <span className="ttu f5 fw5 serious-black">{this.initials()}</span>
          )}
        </button>
        {opened && (
          <ul className="absolute z-999 w5 top-2 right-1 list pa0 mh0 mv4 bg-white br2 shadow-02">
            <li
              className="pointer hover-bg-light-silver pv4"
              onClick={this.handleLogout}
              onMouseDown={this.handleMouseDown}>
              <span className="v-mid pa4">
                <Icon size={12} name="logout" colorFill="gray" />
              </span>
              <span className="link f5 near-black">
                {this.translate('logout')}
              </span>
            </li>
          </ul>
        )}
      </div>
    )
  }
}

Profile.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(Profile)
