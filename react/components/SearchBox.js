import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'

import SearchIcon from './icons/SearchIcon'
import AppGallery from '../AppGallery'

class SearchBox extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
  }

  state = {
    searchValue: '',
    shouldHaveBorder: false,
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ searchValue: value })
  }

  handleFocus = () => {
    this.setState({ shouldHaveBorder: !this.state.shouldHaveBorder })
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  render() {
    const { searchValue, shouldHaveBorder } = this.state
    return (
      <div className="w-100 h-100">
        <div className="flex flex-row w-100 bg-base-1 gray">
          <div className="flex items-center bb bw1 b--rebel-pink pa4">
            <SearchIcon colorFill="gray" />
          </div>
          <input
            className={`pv4 pl2 w-100 f5 gray br0 br-0 bl-0 bt-0 extensions-search b--transparent outline-0 ${
              shouldHaveBorder ? 'borderTransitionIn' : 'borderTransitionOut'
            }`}
            type="text"
            placeholder={this.translate('search')}
            value={searchValue}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleFocus}
          />
        </div>
        <div
          className={`w-100 h-100 bg-base-1 mt7-ns ${
            searchValue ? 'overflow-auto db' : 'dn'
          }`}
        >
          <AppGallery query={searchValue} />
        </div>
      </div>
    )
  }
}

export default injectIntl(SearchBox)
