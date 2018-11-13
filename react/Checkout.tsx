import React, { Component } from 'react'
import BillingInfo from './components/BillingInfo'
import PaymentInfo from './components/PaymentInfo'
import OrderInfo from './components/OrderInfo'
import { Button } from 'vtex.styleguide'

export default class Checkout extends Component<{}> {
  public render () {
    return (
    	<div className="mt9 bg-muted-5">
    	<p className="ph9 fw3 f3 mb7 db mt9">Review your order</p>
      	<div className="flex justify-center ph9 w-100 vh-75">
	    <BillingInfo/>
	    <PaymentInfo/>
		<div className="w-33">
		    <OrderInfo/>
		    <div className="w-100 mt5">
		    <Button variation="primary" block>Confirm order</Button>
		    </div>
		</div>
		</div>   
	</div>  
    )
  }
}
