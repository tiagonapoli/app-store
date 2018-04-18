import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'

import AppShelf from './AppShelf'
import JumbotronIcon from './components/icons/JumbotronIcon'
import SearchBox from './components/SearchBox'

class HomePage extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  render() {
    return (
      <div className="w-100 h-100">
        <div className="flex-ns items-center-ns vh-100-s h-50-ns w-100 bg-serious-black pt9 pl5-s pl7-ns white">
          <div>
            <div className="b f2 mt9-s mt0-ns">Extension Store</div>
            <div className="mt5 mb9-ns f4 fw3">
              {this.translate('homeText')}
            </div>
          </div>
          <div className="w-100-ns tr-ns overflow-hidden">
            <JumbotronIcon />
          </div>
        </div>
        <div className="bg-light-silver">
          <AppShelf homePage />
        </div>
        <div className="dn-s db-ns">
          <SearchBox />
        </div>
      </div>
    )
  }
}

export default injectIntl(HomePage)
