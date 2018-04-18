import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'

import AppShelf from './AppShelf'

class HomePage extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  render() {
    return (
      <div className="w-100 h-100">
        <div className="bg-serious-black pt9 pb10 pl5-s pl7-ns white">
          <div className="b f2 mt6">Extension Store</div>
          <div className="mt5 f4 fw3">{this.translate('homeText')}</div>
        </div>
        <AppShelf />
      </div>
    )
  }
}

export default injectIntl(HomePage)
