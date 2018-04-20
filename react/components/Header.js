import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'

import Profile from './Profile'
import VTEXIcon from './icons/VTEXIcon'
import BackIcon from './icons/BackIcon'
import NoPermissionModal from './NoPermissionModal'
import SearchBox from './SearchBox'

class Header extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    logged: PropTypes.bool,
  }

  state = {
    isModalOpen: false,
    scroll: 0,
    shouldShowSearch: true,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.watchScrollUpMobile)
    this.watchScrollUpMobile()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.watchScrollUpMobile)
  }

  watchScrollUpMobile = () => {
    const currentScroll = window.scrollY
    const { scroll } = this.state
    if (currentScroll < scroll) {
      this.setState({ shouldShowSearch: true, scroll: currentScroll })
    } else {
      this.setState({ shouldShowSearch: false, scroll: currentScroll })
    }
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  handleBack = () => {
    window.history.back()
  }

  handleHome = () => {
    window.location.assign('/')
  }

  handleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  render() {
    const { logged } = this.props
    const { shouldShowSearch, scroll } = this.state
    const notHome = window.location && window.location.pathname.length > 1
    const headerSize =
      window &&
      window.document &&
      window.document.getElementById('extension-store-header') &&
      window.document.getElementById('extension-store-header').offsetHeight
    const titleClasses = notHome ? 'dn db-ns' : 'db'
    return (
      <div className="fixed-ns w-100 z-2">
        <div
          id="extension-store-header"
          className="flex justify-between items-center w-100 top-0 ph4 ph7-ns pv4 pv5-ns bg-serious-black tc tl-ns white"
        >
          <div className="flex items-center">
            <VTEXIcon colorFill="white" className={titleClasses} />
            <BackIcon
              colorFill="white"
              className={`${notHome ? 'db dn-ns rotate-180' : 'dn'}`}
            />
            <div
              className={`pointer b f5-s f4-ns white tc tl-ns lh-solid ml3 ph3 b--white bl ${
                notHome ? 'ml0-s ph0-s bl-0-s ml3-ns ph3-ns bl-ns' : ''
              }`}
              onClick={this.handleHome}
            >
              <span className={titleClasses}>Extension Store</span>
            </div>
            <div
              className={`pointer b f4 white tc tl-ns lh-solid ml3 ph3 b--white bl ${
                notHome ? 'ml0-s ph0-s bl-0-s ml3-ns ph3-ns bl-ns' : ''
              }`}
              onClick={this.handleBack}
            >
              <span className={`${notHome ? 'db dn-ns' : 'dn'}`}>
                {this.translate('back')}
              </span>
            </div>
          </div>
          <div className="tr-ns flex items-center">
            {!logged ? (
              <Profile
                name="Bill Zoo"
                store="Redley"
                pictureUrl="https://i1.wp.com/www.metalinjection.net/wp-content/uploads/2014/08/Giraffe-Tongue-Orchestra.jpg?fit=700%2C525"
              />
            ) : (
              <div className="b--white bw1 ba br2">
                <Button onClick={this.handleModal}>
                  <span className="white">{this.translate('login')}</span>
                </Button>
              </div>
            )}
          </div>
          <NoPermissionModal
            onChange={this.handleModal}
            isOpen={this.state.isModalOpen}
          />
        </div>
        {!notHome && (
          <div
            className={`db dn-ns ${
              scroll > headerSize
                ? `z-3 fixed w-100 ma0 bg-white ${
                  shouldShowSearch ? 'slideDown' : 'slideUp'
                }`
                : ''
            }`}
          >
            <SearchBox />
          </div>
        )}
      </div>
    )
  }
}

export default injectIntl(Header)
