import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './components/Header'
import Footer from './components/Footer'

export default class StoreTemplate extends Component {
  static propTypes = {
    children: PropTypes.element,
  }

  render() {
    return (
      <div className="w-100">
        <Header logged />
        <div className="z-1">{this.props.children}</div>
        <Footer />
      </div>
    )
  }
}
