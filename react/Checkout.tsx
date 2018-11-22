import React, { Component } from 'react'
import BillingInfo from './components/BillingInfo'
import PaymentInfo from './components/PaymentInfo'
import OrderSummary from './components/OrderSummary'
import { Button } from 'vtex.styleguide'

export default class Checkout extends Component<{}> {
  public render () {
		const free = false
    return (
    	<div className="mt9 bg-muted-5">
    		<p className="ph5 ph9-ns fw3 f3 mb7 db mt9 mw9-ns tc tl-ns center">Review your order</p>
				<div className="flex-ns justify-center ph5 ph9-ns w-100 mw9-ns center">
					<BillingInfo/>
					<PaymentInfo free={free}/>
					<div className="w-33-ns w-100">
						<OrderSummary/>
						<div className="w-100 mt5 mb5">
							<Button variation="primary" block>Confirm order</Button>
						</div>
					</div>
				</div>   
			</div>  
    )
  }
}
