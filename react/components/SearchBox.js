import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import SearchIcon from './icons/SearchIcon'

class SearchBox extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  render() {
    return (
      <div className="flex flex-row w-100 bg-white">
        <div className="flex items-center bb bw1 b--rebel-pink pa4">
          <SearchIcon colorFill="gray" />
        </div>
        <input
          className="pv4 pl2 w-100 f5 gray bw0"
          type="text"
          placeholder={this.translate('search')}
        />
      </div>
    )
  }
}

export default injectIntl(SearchBox)
