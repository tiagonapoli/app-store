import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import { removeSlashes } from '../utils/utils'

class AppCategory extends Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    seller: PropTypes.string.isRequired,
    homePage: PropTypes.bool,
    intl: intlShape.isRequired,
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  render() {
    const { category, seller, homePage } = this.props
    return (
      <div
        className={`flex flex-wrap items-center h1 f7-s f6-ns trach-2 ${
          homePage ? 'gray' : 'dark-gray'
        }`}
      >
        {removeSlashes(category) || 'Smartcheckout'}
        <div className="flex items-center f10 light-gray mh2">&#9679;</div>
        <div>
          {this.translate('developedBy')} <span>{seller}</span>
        </div>
      </div>
    )
  }
}

export default injectIntl(AppCategory)
