import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

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
    jumbontronSize: 0,
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  componentDidMount() {
    window.document.title = 'Extension Store'
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
    const { scroll, jumbontronSize } = this.state
    return (
      <div className="w-100">
        <div id="jumbotron-home" className="w-100">
          <div className="flex-ns items-center-ns h-100-s h-50-ns w-100 bg-brand--dark pt9 pl5-s pl7-ns c-base-1">
            <div className="w-100">
              <div className="b f2-s f1-ns mt9-s mt0-ns">Extension Store</div>
              <div className="mt5 mb9-ns f4-s f3-ns fw3">
                {this.translate('homeText')}
              </div>
            </div>
            <div className="w-100-ns tr-ns overflow-hidden">
              <JumbotronIcon />
            </div>
          </div>
          <div id="home-shelf" className="bg-light-silver flex justify-center">
            <div className="w-90-ns">
              <AppGallery homePage collection="137" />
            </div>
          </div>
        </div>
        <div className="w-100 dn-s flex-ns justify-center">
          <div className={`${jumbontronSize < scroll ? 'dn' : 'w-90 mv8-ns'}`}>
            <SearchBox />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-90-ns">
            <AppShelf specificationFilters={[ 'Published' ]} to={8} title="VTEX Apps" />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-90-ns">
            <AppShelf specificationFilters={[ 'Coming Soon' ]} to={8} title={this.translate('comingSoon')} />
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(HomePage)
