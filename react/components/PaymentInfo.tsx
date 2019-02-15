import React, { Component, SFC } from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { Dropdown, Input } from 'vtex.styleguide'

export interface PaymentInfoProps {
  free: boolean
}

const initialState = {
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
}

type PaymentInfoState = typeof initialState

class PaymentInfo extends Component<PaymentInfoProps & InjectedIntlProps, PaymentInfoState> {
  state = initialState

  setFormState = <S extends keyof PaymentInfoState>(stateProperty: S) =>
    (e: React.ChangeEvent<HTMLInputElement>) => this.setState<S>({ [stateProperty]: e.target.value })

  public render () {
    const { formatMessage } = this.props.intl

    return (
      <div className="w-33-ns w-100 h-100 mr5 mb5 br2 bg-base pa5">
		    <h4 className="fw4 ma0 mb7">{formatMessage({ id: 'extensions.checkout.payment-info.title' })}</h4>
        {
          this.props.free ? (
            <div className="tc c-muted-1 pb5 lh-copy">
              {formatMessage({ id: 'extensions.checkout.payment-info.free-message' })}
            </div>
          ) : (
            <div>
              <div className="pb6 bb b--muted-4 mb6">
                <p className="mt0 mb3">
                  {formatMessage({ id: 'extensions.checkout.payment-info.card-number' })}
                </p>
                <div className="mb5">
                  <Input
                    value={this.state.cardNumber}
                    onChange={this.setFormState('cardNumber')}
                  />
                </div>
                <p className="mt0 mb3">
                  {formatMessage({ id: 'extensions.checkout.payment-info.card-holder' })}
                </p>
                <div className="mb5">
                <Input
                  value={this.state.cardHolder}
                  onChange={this.setFormState('cardHolder')}
                /></div>
                <p className="mt0 mb3">
                  {formatMessage({ id: 'extensions.checkout.payment-info.expiration-date' })}
                </p>
                <div className="flex justify-center mb5">
                    <div className="mr5">
                      <Input
                        value={this.state.expirationMonth}
                        placeholder={formatMessage({ id: 'extensions.checkout.payment-info.expiration-date.placeholder.month' })}
                        onChange={this.setFormState('expirationMonth')}
                      />
                    </div>
                    <div>
                      <Input
                        value={this.state.expirationYear}
                        placeholder={formatMessage({ id: 'extensions.checkout.payment-info.expiration-date.placeholder.year' })}
                        onChange={this.setFormState('expirationYear')}
                      />
                    </div>
                </div>
                <p className="mt0 mb3">
                  {formatMessage({ id: 'extensions.checkout.payment-info.security-code' })}
                </p>
                <div className="w-50 pr3">
                  <Input
                    value={this.state.securityCode}
                    placeholder="123"
                    onChange={this.setFormState('securityCode')}
                  />
                </div>
              </div>
              <p className="mt0 mb7">
                {formatMessage({ id: 'extensions.checkout.payment-info.billing-address.title' })}
              </p>
              <div className="flex mb5">
                <div className="w-33 mr5">
                  <p className="mt0 mb3">
                    {formatMessage({ id: 'extensions.checkout.payment-info.billing-address.zip' })}
                  </p>
                  <Input
                    value={this.state.zip}
                    onChange={this.setFormState('zip')}
                  />
                </div>
                <div className="w-66">
                  <p className="mt0 mb3">
                    {formatMessage({ id: 'extensions.checkout.payment-info.billing-address.address' })}
                  </p>
                  <Input
                    value={this.state.street}
                    onChange={this.setFormState('street')}
                  />
                </div>
              </div>
              <div className="flex mb5">
                <div className="w-33 mr5">
                  <p className="mt0 mb3">
                    {formatMessage({ id: 'extensions.checkout.payment-info.billing-address.number' })}
                  </p>
                  <Input
                    value={this.state.number}
                    onChange={this.setFormState('number')}
                  />
                </div>
                <div className="w-66">
                  <p className="mt0 mb3">
                    {formatMessage({ id: 'extensions.checkout.payment-info.billing-address.address-2' })}
                  </p>
                  <Input
                    value={this.state.complement}
                    onChange={this.setFormState('complement')}
                  />
                </div>
              </div>
              <div className="flex mb5">
                <div className="w-66 mr5">
                  <p className="mt0 mb3">
                    {formatMessage({ id: 'extensions.checkout.payment-info.billing-address.city' })}
                  </p>
                  <Input
                    value={this.state.city}
                    onChange={this.setFormState('city')}
                  />
                </div>
                <div className="w-33">
                  <p className="mt0 mb3">
                    {formatMessage({ id: 'extensions.checkout.payment-info.billing-address.state' })}
                  </p>
                  <Dropdown
                    value={this.state.state}
                    options={[
                      { value: 'RJ', label: 'RJ' },
                      { value: 'SP', label: 'SP' },
                    ]}
                    onChange={this.setFormState('state')}
                  />
                </div>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

export default injectIntl(PaymentInfo)
