import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { Helmet } from 'render'

import { COMING_SOON } from './utils/constants'
import AppShelf from './AppShelf'
import AppGallery from './AppGallery'
import JumbotronIcon from './components/icons/JumbotronIcon'
import SearchBox from './components/SearchBox'

class HomePage extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
  }

  static contextTypes = {
    prefetchPage: PropTypes.func,
  }

  state = {
    scroll: 0,
    jumbontronSize: 890,
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  componentDidMount() {
    this.context.prefetchPage('store/product')
    this.context.prefetchPage('store/review')
    window.addEventListener('scroll', this.watchScrollUpDesktop)
    this.watchScrollUpDesktop()
    this.setState({
      jumbontronSize: window.document.getElementById('jumbotron-home')
        .offsetHeight,
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.watchScrollUpDesktop)
  }

  watchScrollUpDesktop = () => {
    const currentScroll = window.scrollY
    this.setState({ scroll: currentScroll })
  }

  render() {
    const SHELF_SIZE = 12
    const { scroll, jumbontronSize } = this.state
    return (
      <div className="w-100">
        <div id="jumbotron-home" className="w-100">
          <div className="flex-ns justify-center-ns items-center-ns h-100-s h-50-ns w-100 bg-serious-black pt10 pl5-s pl7-ns white">
            <div className="flex-ns w-100 mw9">
              <div className="w-100">
                <div className="b f2-s f1-ns mt9-s mt0-ns">VTEX App Store</div>
                <div className="mt5 mb9-ns f4-s f3-ns fw3">
                  {this.translate('homeText')}
                </div>
              </div>
              <div className="w-100-ns tr-ns overflow-hidden">
                <JumbotronIcon />
              </div>
            </div>
          </div>
          <div id="home-shelf" className="bg-light-silver flex justify-center">
            <div className="w-90-ns mw9">
              <AppGallery homePage collection="137" />
            </div>
          </div>
          <div
            className={`w-100 dn-s flex-ns justify-center ${
              jumbontronSize < scroll ? 'visibility-hidden' : ''
            }`}
          >
            <div className="mw9 visibility-visible w-90 mv8-ns">
              <SearchBox />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="mw9 w-90-ns">
            <AppShelf
              specificationFilters="Published"
              to={SHELF_SIZE}
              title="Apps"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="mw9 w-90-ns">
            <AppShelf
              specificationFilters={COMING_SOON}
              to={SHELF_SIZE}
              title={this.translate('comingSoon')}
            />
          </div>
        </div>
        <Helmet><title>VTEX App Store</title></Helmet>
      </div>
    )
  }
}

export default injectIntl(HomePage)
