import React, { Component } from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { Button } from 'vtex.styleguide'

import OrderSummary from './components/checkout/OrderSummary'
import Payment, { PaymentData } from './components/checkout/Payment'
import Profile from './components/checkout/Profile'
import { AvailableAppQuery } from './components/queries/AvailableAppQuery'

import AvailableApp from './queries/GetCart.gql'

const profileData = {
  cnpj: '00.000.000/0000-00',
  companyName: 'BROCKTON INDUSTRIA E COMERCIO DE VESTUARIO E FACCOES LTDA',
  fantasyName: 'Redley',
  userMail: 'joe@redley.com',
  userName: 'Joe Zoo',
}
const appManifest = {
  billingOptions: {
    free: false,
    termsURL: '',
  },
  categories: [],
  credentialType: '',
  dependencies: {},
  description: '',
  name: 'masterpass',
  peerDependencies: {},
  policies: [],
  registries: [],
  settingsSchema: {},
  title: 'Masterpass',
  vendor: 'vtex',
  version: '1.0.0',
}
const seller = 'VTEX'
const productName = 'Masterpass'
const appIcon = {
  name: 'masterpass',
  url: 'https://extensions.vteximg.com.br/arquivos/ids/155413/masterpass-ic.png?v=636610492911230000'
}

const initialState = {
  paymentData: {
    cardHolder: '',
    cardNumber: '',
    city: '',
    complement: '',
    expirationMonth: '',
    expirationYear: '',
    number: '',
    securityCode: '',
    state: '',
    street: '',
    zip: '',
  },
}

type CheckoutState = typeof initialState

class Checkout extends Component<InjectedIntlProps, CheckoutState> {
  
  state = initialState

  setPaymentData = (paymentProp: keyof PaymentData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      this.setState({
        paymentData: {
          ...this.state.paymentData,
          [paymentProp]: e.target.value,
        },
      })

  placeOrder = () => {
    return
  }

  render () {
		const { formatMessage } = this.props.intl
    return (
			<div className="mt9 bg-muted-5 flex-grow-1">
				<p className="ph5 ph9-ns fw3 f3 mb7 db mt9 mw9-ns tc tl-ns center">
					{formatMessage({ id: 'extensions.checkout.title' })}
				</p>
				<div className="flex-ns justify-center ph5 ph9-ns w-100 mw9-ns center">
					<Profile profileData={profileData} />
					<Payment
            free={appManifest.billingOptions.free}
            paymentData={this.state.paymentData}
            onInputChange={this.setPaymentData}
          />
					<div className="w-third-ns w-100">
            <AvailableAppQuery
              query={AvailableApp}
            >
              {({}) => <OrderSummary
                appManifest={appManifest}
                seller={seller}
                appIcon={appIcon}
                productName={productName}
              />}
            </AvailableAppQuery>
						<div className="w-100 mt5 mb5">
              <Button
                variation="primary"
                onClick={this.placeOrder}
                block
              >
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
