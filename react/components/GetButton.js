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
    homePage: PropTypes.bool,
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  handleClick = e => {
    e.preventDefault()
    const { navigate, appId } = this.props
    const options = {
      params: { slug: appId },
      page: 'store/review',
      fallbackToWindowLocation: false,
    }
    navigate(options)
  }

  render() {
    const { homePage } = this.props
    return (
      <div className={`tc br2 w-100 w-80-ns ${homePage ? 'bg-light-silver' : 'bg-rebel-pink'}`}>
        <Button onClick={this.handleClick} block>
          <span className={`${homePage ? 'rebel-pink' : 'white'}`}>{this.translate('get')}</span>
        </Button>
      </div>
    )
  }
}

export default withNavigate()(injectIntl(GetButton))
