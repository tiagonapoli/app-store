import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import { Helmet } from 'render'

import AppGallery from './AppGallery'
import JumbotronIcon from './components/icons/JumbotronIcon'
import SearchBox from './components/SearchBox'
import { Badge } from 'vtex.styleguide'

class Jumbotron extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
  }

  state = {
    scroll: 0,
    jumbontronSize: 890,
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  componentDidMount() {
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
      <div id="jumbotron-home" className="w-100">
        <div className="flex-ns justify-center-ns items-center-ns h-100-s h-50-ns w-100 bg-serious-black pt10 pl5-s pl7-ns white">
          <div className="flex-ns w-100 mw9">
            <div className="w-100 pl5 pr6">
            <span className="mr4">
              <Badge bgColor="#F71963" color="#FFFFFF">Beta</Badge>
            </span>
              <div className="f2 fw5 mt5 pb5 lh-title">VTEX App Store</div>
              <div className="w-80-l mt5 mb9-ns f4 fw3 lh-copy">
                {this.translate('homeText')}
              </div>
            </div>
            <div className="w-100-ns tr-ns overflow-hidden">
              <JumbotronIcon />
            </div>
          </div>
        </div>
        <div id="home-shelf" className="bg-light-silver flex justify-center">
          <AppGallery homePage collection="137" />
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
        <Helmet>
          <title>VTEX App Store</title>
        </Helmet>
      </div>
    )
  }
}

export default injectIntl(Jumbotron)
