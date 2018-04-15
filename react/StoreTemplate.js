import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './HomePage'

export default class StoreTemplate extends Component {
  static propTypes = {
    children: PropTypes.element,
  }

  render() {
    return (
      <div className="w-100 h-100">
        <Header logged />
        <div className="z-1 h-100 mt9-ns">
          {this.props.children ? this.props.children : <HomePage />}
        </div>
        <Footer />
      </div>
    )
  }
}
