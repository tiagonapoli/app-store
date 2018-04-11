import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'

class GetButton extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  render() {
    return (
      <div className="bg-rebel-pink tc br2 w-100 w-80-ns">
        <Button>
          <span className="white">{this.translate('get')}</span>
        </Button>
      </div>
    )
  }
}

export default injectIntl(GetButton)
