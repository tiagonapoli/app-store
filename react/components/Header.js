import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import { injectIntl, intlShape } from 'react-intl'
import { Link } from 'render'
import Button from '@vtex/styleguide/lib/Button'

import profileQuery from '../queries/profileQuery.gql'
import Profile from './Profile'
import VTEXIcon from './icons/VTEXIcon'
import BackIcon from './icons/BackIcon'
import SearchBox from './SearchBox'
import Loading from './Loading'
import LoginModal from './LoginModal'

class Header extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    data: PropTypes.object,
  }

  state = {
    scroll: 0,
    shouldShowSearch: true,
    headerSize: 0,
    jumbontronSize: 0,
    store: '',
    shouldShowLoginModal: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.watchScrollUpMobile)
    this.watchScrollUpMobile()
    this.setState({
      headerSize: window.document.getElementById('extension-store-header')
        .offsetHeight,
      jumbontronSize:
        window.document.getElementById('jumbotron-home') &&
        window.document.getElementById('jumbotron-home').offsetHeight,
      store: window.localStorage.getItem('account') || '',
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.watchScrollUpMobile)
  }

  watchScrollUpMobile = () => {
    const currentScroll = window.scrollY
    const { scroll } = this.state
    this.setState({
      shouldShowSearch: currentScroll < scroll,
      scroll: currentScroll,
    })
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  handleBack = () => {
    window.history.back()
  }

  handleLogin = () => {
    this.setState({ shouldShowLoginModal: !this.state.shouldShowLoginModal })
  }

  render() {
    const {
      data: { loading, topbarData, error },
    } = this.props
    const {
      shouldShowLoginModal,
      shouldShowSearch,
      scroll,
      headerSize,
      jumbontronSize,
      store,
    } = this.state
    const notHome = window.location && window.location.pathname.length > 1
    const titleClasses = notHome ? 'dn db-ns' : 'db'
    return (
      <div className="fixed-ns w-100 z-2">
        <div
          id="extension-store-header"
          className="flex justify-between items-center w-100 top-0 ph4 ph7-ns pv4 pv5-ns bg-brand--dark tc tl-ns c-base-1"
        >
          <div className="flex items-center">
            <VTEXIcon colorFill="base-1" className={titleClasses} />
            <BackIcon
              colorFill="base-1"
              className={`${notHome ? 'db dn-ns rotate-180' : 'dn'}`}
            />
            <Link page="store" className="link">
              <div
                className={`pointer b f5-s f4-ns c-base-1 tc tl-ns lh-solid ml3 ph3 b--base-1 bl ${
                  notHome ? 'ml0-s ph0-s bl-0-s ml3-ns ph3-ns bl-ns' : ''
                }`}
              >
                <span className={titleClasses}>Extension Store</span>
              </div>
              <div
                className={`pointer b f4 c-base-1 tc tl-ns lh-solid ml3 ph3 b--base-1 bl ${
                  notHome ? 'ml0-s ph0-s bl-0-s ml3-ns ph3-ns bl-ns' : ''
                }`}
                onClick={this.handleBack}
              >
                <span className={`${notHome ? 'db dn-ns' : 'dn'}`}>
                  {this.translate('back')}
                </span>
              </div>
            </Link>
          </div>
          <div className="tr-ns flex items-center">
            {false ? (
              <Profile
                name={topbarData.profile.name}
                store={store}
                pictureUrl={topbarData.profile.picture}
              />
            ) : (
              <div className="f5 fw5">
                {true ? (
                  <div className="bw1 ba br2">
                    <Button onClick={this.handleLogin}>
                      {this.translate('login')}
                    </Button>
                  </div>
                ) : (
                  <Loading />
                )}
              </div>
            )}
          </div>
        </div>
        {!notHome && (
          <div
            className={`db dn-ns ${
              scroll > headerSize
                ? `z-3 fixed w-100 ma0 bg-base-1 ${
                  shouldShowSearch ? 'slideDownMobile' : 'slideUpMobile'
                }`
                : ''
            }`}
          >
            <SearchBox />
          </div>
        )}
        {!notHome && (
          <div
            className={`dn ${
              scroll > jumbontronSize
                ? 'db-ns z-3 ma0 w-100 ph9 fixed bg-base-1 slideDown'
                : 'slideUp'
            }`}
          >
            <SearchBox />
          </div>
        )}
        <LoginModal isOpen={shouldShowLoginModal} onClose={this.handleLogin} />
      </div>
    )
  }
}

export default compose(
  graphql(profileQuery, { options: { ssr: false } }),
  injectIntl
)(Header)
