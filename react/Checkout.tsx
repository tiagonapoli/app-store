import React, { Component } from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { Button } from 'vtex.styleguide'

import BillingInfo from './components/BillingInfo'
import OrderSummary from './components/OrderSummary'
import PaymentInfo from './components/PaymentInfo'

class Checkout extends Component<InjectedIntlProps> {
  render () {
		const free = true
		const billingOptions = { free, termsURL: '' }
		const { formatMessage } = this.props.intl
    return (
			<div className="mt9 bg-muted-5 flex-grow-1">
				<p className="ph5 ph9-ns fw3 f3 mb7 db mt9 mw9-ns tc tl-ns center">
					{formatMessage({ id: 'extensions.checkout.title' })}
				</p>
				<div className="flex-ns justify-center ph5 ph9-ns w-100 mw9-ns center">
					<BillingInfo/>
					<PaymentInfo free={free}/>
					<div className="w-33-ns w-100">
						<OrderSummary billingOptions={billingOptions}/>
						<div className="w-100 mt5 mb5">
							<Button variation="primary" block>
								{formatMessage({ id: 'extensions.checkout.button.confirm' })}
							</Button>
						</div>
					</div>
				</div>
			</div>
    )
  }
}

export default injectIntl(Checkout)
