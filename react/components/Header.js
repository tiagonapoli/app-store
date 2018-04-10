import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'

import Profile from './Profile'
import VTEXIcon from './VTEXIcon'

class Header extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    logged: PropTypes.bool,
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  render() {
    const { logged } = this.props
    return (
      <div className="z-2 flex justify-between items-center w-100 top-0 ph4 ph7-ns pv4 pv5-ns bg-serious-black bb bw1 tc tl-ns white">
        <div className="flex items-center">
          <VTEXIcon colorFill="white" />
          <a
            className="ml3 ph3 link b f4 white tc tl-ns b--white bl lh-solid"
            href="/"
          >
            Extension Store
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
