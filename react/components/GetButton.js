import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'

import withNavigate from '../withNavigate'

class GetButton extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    appId: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  handleClick = () => {
    const { navigate, appId } = this.props
    const options = {
      params: { id: appId },
      page: 'store/review',
      fallbackToWindowLocation: false,
    }
    navigate(options)
  }

  render() {
    return (
      <div className="bg-rebel-pink tc br2 w-100 w-80-ns">
        <Button onClick={this.handleClick}>
          <span className="white">{this.translate('get')}</span>
        </Button>
      </div>
    )
  }
}

export default withNavigate()(injectIntl(GetButton))
