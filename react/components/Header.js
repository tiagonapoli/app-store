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
    headerSize: 64,
    jumbontronSize: 890,
    store: '',
    shouldShowLoginModal: false,
  }

  componentDidMount() {
    const query = window.location.search
    let account
    if (query) {
      account = query.replace('?an=', '')
      window.localStorage.setItem('account', account)
    }
    window.addEventListener('scroll', this.watchScrollUpMobile)
    this.watchScrollUpMobile()
    this.setState({
      headerSize: window.document.getElementById('extension-store-header')
        .offsetHeight,
      jumbontronSize:
        window.document.getElementById('jumbotron-home') &&
        window.document.getElementById('jumbotron-home').offsetHeight,
      store: account || window.localStorage.getItem('account') || '',
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
          className="flex justify-between items-center w-100 top-0 ph4 ph7-ns pv4 pv5-ns bg-serious-black tc tl-ns white"
        >
          <div className="flex items-center">
            <VTEXIcon colorFill="white" className={titleClasses} />
            <BackIcon
              colorFill="white"
              className={`${notHome ? 'db dn-ns rotate-180' : 'dn'}`}
            />
            <Link page="store" className="link">
              <div
                className={`pointer b f5-s f4-ns white tc tl-ns lh-solid ml3 ph3 b--white bl ${
                  notHome ? 'ml0-s ph0-s bl-0-s ml3-ns ph3-ns bl-ns' : ''
                }`}
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
            </Link>
          </div>
          <div className="tr-ns flex items-center">
            {!loading && !error ? (
              <Profile
                name={topbarData.profile.name}
                store={store}
                pictureUrl={topbarData.profile.picture}
              />
            ) : (
              <div className="white f5 fw5">
                {error ? (
                  <div className="b--white bw1 ba br2">
                    <Button onClick={this.handleLogin}>
                      <span className="white">{this.translate('login')}</span>
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
                ? `z-3 fixed w-100 ma0 bg-white light-shadow ${
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
                ? 'db-ns z-3 ma0 w-100 ph9 fixed bg-white slideDown light-shadow'
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
