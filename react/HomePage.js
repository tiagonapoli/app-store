import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'

class HomePage extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  render() {
    return (
      <div className="w-100 h-100">
        <div className="bg-serious-black pt9 pb10">
          <div className="ml5-s ml7-ns mt6 white">
            <div className="b f2">Extension Store</div>
            <div className="mt5 f4 fw3">{this.translate('homeText')}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(HomePage)
