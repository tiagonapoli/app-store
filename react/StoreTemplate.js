import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './store.global.css'
import Header from './components/Header'
import Footer from './Footer'

export default class StoreTemplate extends Component {
  static propTypes = {
    children: PropTypes.element,
  }

  render() {
    return (
      <div className="w-100 h-100 overflow-x-hidden content">
        <Header />
        <div className="h-100 pt8-ns content">{this.props.children}</div>
        <Footer />
      </div>
    )
  }
}
