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
      <div className="w-100 h-100 overflow-x-hidden content">
        <Header logged />
        <div className="h-100 pt9-ns content">
          {this.props.children ? this.props.children : <HomePage />}
        </div>
        <Footer />
      </div>
    )
  }
}
