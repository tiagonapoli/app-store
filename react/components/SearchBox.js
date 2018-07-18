import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { IconFailure } from 'vtex.styleguide'
import SearchIcon from './icons/SearchIcon'
import AppGallery from '../AppGallery'

class SearchBox extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    onSearch: PropTypes.func,
  }

  state = {
    searchValue: '',
    shouldHaveBorder: false,
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ searchValue: value })
    this.props.onSearch && this.props.onSearch(value)
  }

  handleFocus = () => {
    this.setState({ shouldHaveBorder: !this.state.shouldHaveBorder })
  }

  handleClear = () => {
    this.handleChange({ target: { value: '' } })
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  render() {
    const { searchValue, shouldHaveBorder } = this.state
    return (
      <div className="w-100 h-100">
        <div className="flex flex-row w-100 bg-white gray">
          <div className="flex items-center bb bw1 b--rebel-pink ph3-ns ph6-s pv3">
            <SearchIcon colorFill="gray" />
          </div>
          <input
            className={`pv5 pl3 w-100 f5 gray br0 br-0 bl-0 bt-0 extensions-search b--transparent outline-0 ${
              shouldHaveBorder ? 'borderTransitionIn' : 'borderTransitionOut'
            }`}
            type="text"
            placeholder={this.translate('search')}
            value={searchValue}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleFocus}
          />
          {searchValue &&
            <div
              className={`relative right-0-s right-2-ns pr5-s pr0-ns pointer pv5 ${
                shouldHaveBorder ? 'borderTransitionIn' : 'borderTransitionOut'
              }`}
              onClick={this.handleClear}>
              <IconFailure solid size={18} color="#979899" />
            </div>
          }
        </div>
        <div
          className={`w-100 h-100 bg-white mt7-ns ${
            searchValue ? 'overflow-auto db' : 'dn'
          }`}
        >
          <AppGallery searchTerm={searchValue} />
        </div>
      </div>
    )
  }
}

export default injectIntl(SearchBox)
