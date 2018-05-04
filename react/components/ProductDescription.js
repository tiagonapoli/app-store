import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import marksy from 'marksy'

import Billing from './Billing'
import GetButton from './GetButton'

/* eslint-disable react/display-name, react/prop-types */
const compile = marksy({
  createElement,
  elements: {
    h4: ({ children }) => <div className="f5">{children}</div>,
    ul: ({ children }) => <ul className="f5 list pl0 pr3">{children}</ul>,
    li: ({ children }) => (
      <li className="lh-copy flex flex-row">
        <div className="f7 ma1">&#9643;</div>
        {children}
      </li>
    ),
    strong: ({ children }) => <span className="fw5">{children}</span>,
  },
})
/* eslint-disable react/display-name, react/prop-types */

class ProductDescription extends Component {
  state = {
    fixed: true,
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    billing: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired,
    registry: PropTypes.string.isRequired,
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
    const { billing, description, id } = this.props
    return (
      <div className="mh6-s mh0-ns near-black f5">
        <Billing billingOptions={billing} />
        <div className="pt5 pb3-s pb10-ns">{compile(description).tree}</div>
        <div className="h3">
          <div
            className={`bottom-0 left-0 w-100 z-2 db-s dn-ns b--base-1 bb bw2 get-button-shadow bg-base-1 ${
              this.state.fixed ? 'fixed pb4 ph6' : ''
            }`}
          >
            <GetButton appId={id} />
          </div>
        </div>
      </div>
    )
  }
}

export default ProductDescription
