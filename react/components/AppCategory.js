import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

class AppCategory extends Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    seller: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  render() {
    const { category, seller } = this.props
    return (
      <div className="flex flex-wrap f6-s f5-ns dark-gray ttc">
        {category || 'Sales'}
        <div className="flex items-center f9 light-gray mh2">&#9679;</div>
        <div>
          {this.translate('developedBy')} <span className="ttu">{seller}</span>
        </div>
      </div>
    )
  }
}

export default injectIntl(AppCategory)
