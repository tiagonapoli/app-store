import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { Link, Helmet } from 'render'

import googleAnalytics from './scripts/googleAnalytics'
import VTEXIcon from './components/icons/VTEXIcon'
import BackIcon from './components/icons/BackIcon'
import LocaleSwitcher from './components/LocaleSwitcher'
import SearchBox from './components/SearchBox'
import withPage from './withPage'
import './store.global.css'

const HOME_PAGE = 'store/home'

class Header extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    data: PropTypes.object,
    page: PropTypes.string,
  }

  state = {
    scroll: 0,
    shouldShowSearch: true,
    headerSize: 64,
    jumbontronSize: 890,
    store: '',
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
      headerSize:
        window.document.getElementById('extension-store-header') &&
        window.document.getElementById('extension-store-header').offsetHeight,
      jumbontronSize:
        window.document.getElementById('jumbotron-home') &&
        window.document.getElementById('jumbotron-home').offsetHeight,
    })
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  handleBack = () => {
    window.history.back()
  }

  render() {
    const { shouldShowSearch, scroll, headerSize, jumbontronSize } = this.state
    const notHome = this.props.page !== HOME_PAGE
    const titleClasses = notHome ? 'dn db-ns' : 'db'
    return (
      <div className="fixed-ns w-100 z-2">
        <Helmet>
          <script type="text/javascript">
            {googleAnalytics}
          </script>
        </Helmet>
        <div
          id="extension-store-header"
          className="flex justify-between items-center w-100 top-0 pa5 ph7-ns bg-serious-black tc tl-ns white"
        >
          <div className="flex items-center">
            <BackIcon
              colorFill="white"
              className={`${notHome ? 'db dn-ns rotate-180' : 'dn'}`}
            />
            <Link page="store" className="link">
              <VTEXIcon colorFill="white" className={titleClasses} text={"App Store"} />
            </Link>
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
          <LocaleSwitcher />
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
                ? 'db-ns z-3 ma0 w-100 ph7 fixed bg-white slideDown light-shadow'
                : 'slideUp'
            }`}
          >
            <SearchBox />
          </div>
        )}
      </div>
    )
  }
}

export default withPage()(injectIntl(Header))
