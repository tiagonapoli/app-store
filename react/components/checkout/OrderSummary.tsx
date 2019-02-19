import { AppManifest } from '@vtex/api'
import React, { SFC } from 'react'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'

import AppIcon from '../AppIcon'

export interface OrderSummaryProps {
  appIcon: {
    name: string
    url: string
  }
  appManifest: AppManifest
  seller: string
  productName: string
}

const OrderSummary: SFC<OrderSummaryProps & InjectedIntlProps> = (props) => {
  const { formatMessage } = props.intl
  const { billingOptions } = props.appManifest
  const { appIcon, seller, productName } = props

  const freePricing = formatMessage({ id: 'extensions.checkout.order-summary.pricing.free' })
  return (
    <div className="br2 bg-base pa5">
      <h4 className="fw4 mt0 mb7">
        {formatMessage({ id: 'extensions.checkout.order-summary.title' })}
      </h4>
      <div className="flex mb7">
        <div className="mr5">
          <AppIcon imageUrl={appIcon.url} name={appIcon.name}/>
        </div>
        <div>
          <p className="mt0 mb3 f3 fw6">{productName}</p>
          <p className="ma0 c-muted-1 f6">
            <FormattedMessage
              id="extensions.checkout.order-summary.developed-by"
              values={{
                seller,
              }}
            />
          </p>
        </div>
      </div>
      <div>
        <p className="mt0 mb5 fw6">
          {formatMessage({ id: 'extensions.checkout.order-summary.pricing.title' })}
        </p>
        <div className="flex justify-between pb6 bb b--muted-4 mb6">
          <p className="ma0 c-muted-1">
            {formatMessage({ id: 'extensions.checkout.order-summary.pricing.product' })}
          </p>
          <p className="ma0">{billingOptions.free ? freePricing : 'R$120,00'}</p>
        </div>
        <div className="flex justify-between mb5">
            <p className="ma0 fw6">
              {formatMessage({ id: 'extensions.checkout.order-summary.pricing.total.title' })}
            </p>
          <p className="ma0">{billingOptions.free ? freePricing : 'R$120,00'}</p>
        </div>
      </div>
      <div>
        <p className="mt0 f6 c-muted-1">
          <FormattedMessage
            id="extensions.checkout.order-summary.disclaimer"
            values={{
              link: <a className="ma0 c-link hover-c-link pointer">{formatMessage({ id: 'extensions.checkout.order-summary.disclaimer.link' })}</a>,
            }}
          />
        </p>
      </div>
    </div>
  )
}

export default injectIntl(OrderSummary)