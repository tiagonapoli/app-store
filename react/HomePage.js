import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'

import AppShelf from './AppShelf'
import JumbotronIcon from './components/icons/JumbotronIcon'
import SearchBox from './components/SearchBox'

class HomePage extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
  }

  state = {
    scroll: 0,
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  componentDidMount() {
    window.addEventListener('scroll', this.watchScrollUpDesktop)
    this.watchScrollUpDesktop()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.watchScrollUpDesktop)
  }

  watchScrollUpDesktop = () => {
    const currentScroll = window.scrollY
    this.setState({ scroll: currentScroll })
  }

  render() {
    const { scroll } = this.state
    const jumbontronSize =
      window &&
      window.document &&
      window.document.getElementById('jumbotron-home') &&
      window.document.getElementById('jumbotron-home').offsetHeight
    return (
      <div className="w-100">
        <div id="jumbotron-home" className="w-100">
          <div className="flex-ns items-center-ns h-100-s h-50-ns w-100 bg-serious-black pt9 pl5-s pl7-ns white">
            <div>
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
              <AppShelf homePage />
            </div>
          </div>
        </div>
        <div className="w-100 dn-s flex-ns justify-center">
          <div
            className={`${
              jumbontronSize < scroll ? 'w-90 fixed z-4 top-2 bg-white' : 'w-90'
            }`}
          >
            <SearchBox />
          </div>
        </div>
        <AppShelf homePage />
        <AppShelf homePage />
      </div>
    )
  }
}

export default injectIntl(HomePage)
