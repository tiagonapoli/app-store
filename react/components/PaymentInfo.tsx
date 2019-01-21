import React, { Component } from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { Dropdown, Input } from 'vtex.styleguide'

export interface PaymentInfoProps {
  free: boolean
}

class PaymentInfo extends Component<PaymentInfoProps & InjectedIntlProps> {

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
                <div className="mb5"><Input /></div>
                <p className="mt0 mb3">
                  {formatMessage({ id: 'extensions.checkout.payment-info.card-holder' })}
                </p>
                <div className="mb5"><Input /></div>
                <p className="mt0 mb3">
                  {formatMessage({ id: 'extensions.checkout.payment-info.expiration-date' })}
                </p>
                <div className="flex justify-center mb5">
                    <div className="mr5">
                      <Input
                        placeholder={formatMessage({ id: 'extensions.checkout.payment-info.expiration-date.placeholder.month' })}
                      />
                    </div>
                    <div>
                      <Input
                        placeholder={formatMessage({ id: 'extensions.checkout.payment-info.expiration-date.placeholder.year' })}
                      />
                    </div>
                </div>
                <p className="mt0 mb3">
                  {formatMessage({ id: 'extensions.checkout.payment-info.security-code' })}
                </p>
                <div className="w-50 pr3"><Input /></div>
              </div>
              <p className="mt0 mb7">
                {formatMessage({ id: 'extensions.checkout.payment-info.billing-address.title' })}
              </p>
              <div className="flex mb5">
                <div className="w-33 mr5">
                  <p className="mt0 mb3">
                    {formatMessage({ id: 'extensions.checkout.payment-info.billing-address.zip' })}
                  </p>
                  <Input />
                </div>
                <div className="w-66">
                  <p className="mt0 mb3">
                    {formatMessage({ id: 'extensions.checkout.payment-info.billing-address.address' })}
                  </p>
                  <Input />
                </div>
              </div>
              <div className="flex mb5">
                <div className="w-33 mr5">
                  <p className="mt0 mb3">
                    {formatMessage({ id: 'extensions.checkout.payment-info.billing-address.number' })}
                  </p>
                  <Input />
                </div>
                <div className="w-66">
                  <p className="mt0 mb3">
                    {formatMessage({ id: 'extensions.checkout.payment-info.billing-address.address-2' })}
                  </p>
                  <Input />
                </div>
              </div>
              <div className="flex mb5">
                <div className="w-66 mr5">
                  <p className="mt0 mb3">
                    {formatMessage({ id: 'extensions.checkout.payment-info.billing-address.city' })}
                  </p>
                  <Input />
                </div>
                <div className="w-33">
                  <p className="mt0 mb3">
                    {formatMessage({ id: 'extensions.checkout.payment-info.billing-address.state' })}
                  </p>
                  <Dropdown
                    options={[
                      { value: 'RJ', label: 'RJ' },
                      { value: 'SP', label: 'SP' },
                    ]}
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
