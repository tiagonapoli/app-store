import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AppIcon from '../components/AppIcon'

export default class OrderSummary extends Component<{ billingOptions: any }> {
  static propTypes = {
    billingOptions: PropTypes.object.isRequired
  }

  public render () {
    const { billingOptions: { free } } = this.props
    return (
      <div className="br2 bg-base pa5">
		    <h4 className="fw4 mt0 mb7">Order Summary</h4>
        <div className="flex mb7">
          <div className="mr5">
            <AppIcon imageUrl="https://extensions.vteximg.com.br/arquivos/ids/155413/masterpass-ic.png?v=636610492911230000" name="masterpass"/>
          </div>
          <div>
            <p className="mt0 mb3 f3 fw6">Masterpass</p>
            <p className="ma0 c-muted-1 f6">Developed by VTEX</p>
          </div>
        </div>
        <div>
          <p className="mt0 mb5 fw6">Price</p>
          <div className="flex justify-between pb6 bb b--muted-4 mb6">
            <p className="ma0 c-muted-1">App</p>
            <p className="ma0">{free ? "Free" : "R$120,00"}</p>
          </div>
          <div className="flex justify-between mb5">
            <p className="ma0 fw6">Total</p>
            <p className="ma0">{free ? "Free" : "R$120,00"}</p>
          </div>
        </div>
        <div>
          <p className="mt0 f6 c-muted-1">This amount will be charged monthly and can vary according to the usage of the service. <a className="ma0 c-link hover-c-link pointer">See app details</a></p>
        </div>
      </div>
    )
  }
}
