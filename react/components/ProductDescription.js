import React, { Component } from 'react'
import PropTypes from 'prop-types'

import GetButton from './GetButton'

class ProductDescription extends Component {
  state = {
    fixed: true,
  }

  static propTypes = {
    description: PropTypes.string.isRequired,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.watchScroll)
    this.watchScroll()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.watchScroll)
  }

  watchScroll = () => {
    const scroll = window.pageYOffset
    const scrollHeight = document.body.scrollHeight
    const footerSize = document.getElementById('extension-store-footer')
      .offsetHeight
    const fixed =
      document.documentElement.offsetHeight > window.innerHeight
        ? scroll < scrollHeight - footerSize - window.innerHeight
        : false
    if (fixed !== this.state.fixed) {
      this.setState({
        fixed,
      })
    }
  }

  render() {
    const { description } = this.props
    return (
      <div className="mh6-s mh0-ns near-black f5">
        <div className="pb3-s pb10-ns">{description}</div>
        <div className="h3">
          <div
            className={`bottom-0 left-0 w-100 z-2 db-s dn-ns b--white bb bw2 get-button-shadow bg-white ${
              this.state.fixed ? 'fixed pb4 ph6' : ''
            }`}
          >
            <GetButton />
          </div>
        </div>
      </div>
    )
  }
}

export default ProductDescription
