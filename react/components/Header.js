import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'

import Profile from './Profile'
import VTEXIcon from './icons/VTEXIcon'
import BackIcon from './icons/BackIcon'

class Header extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    logged: PropTypes.bool,
  }

  state = {
    notHome: true,
  }

  componentDidMount() {
    this.setState({
      notHome: window.location && window.location.pathname.length > 1,
    })
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  render() {
    const { logged } = this.props
    const { notHome } = this.state
    const titleClasses = notHome ? 'dn db-ns' : 'db'
    return (
      <div className="z-2 flex justify-between items-center w-100 top-0 ph4 ph7-ns pv4 pv5-ns bg-serious-black bb bw1 tc tl-ns white">
        <div className="flex items-center">
          <VTEXIcon colorFill="white" className={titleClasses} />
          <BackIcon
            colorFill="white"
            className={`${notHome ? 'db dn-ns rotate-180' : 'dn'}`}
          />
          <a
            className={`link b f4 white tc tl-ns lh-solid ml3 ph3 b--white bl ${
              notHome ? 'ml0-s ph0-s bl-0-s ml3-ns ph3-ns bl-ns' : ''
            }`}
            href="/"
          >
            <span className={titleClasses}>Extension Store</span>
            <span className={`${notHome ? 'db dn-ns' : 'dn'}`}>
              {this.translate('back')}
            </span>
          </a>
        </div>
        <div className="tr-ns flex items-center">
          {logged ? (
            <Profile
              name="Bill Zoo"
              store="Redley"
              pictureUrl="https://i1.wp.com/www.metalinjection.net/wp-content/uploads/2014/08/Giraffe-Tongue-Orchestra.jpg?fit=700%2C525"
            />
          ) : (
            <div className="b--white bw1 ba br2">
              <Button>
                <span className="white">{this.translate('login')}</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default injectIntl(Header)
