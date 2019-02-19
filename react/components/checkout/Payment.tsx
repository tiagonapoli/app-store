import React, { Component, Fragment, SFC } from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { Dropdown, Input } from 'vtex.styleguide'

const states = [
  { value: 'AC', label: 'AC' },
  { value: 'AL', label: 'AL' },
  { value: 'AP', label: 'AP' },
  { value: 'AM', label: 'AM' },
  { value: 'BA', label: 'BA' },
  { value: 'CE', label: 'CE' },
  { value: 'DF', label: 'DF' },
  { value: 'ES', label: 'ES' },
  { value: 'GO', label: 'GO' },
  { value: 'MA', label: 'MA' },
  { value: 'MT', label: 'MT' },
  { value: 'MS', label: 'MS' },
  { value: 'MG', label: 'MG' },
  { value: 'PA', label: 'PA' },
  { value: 'PB', label: 'PB' },
  { value: 'PR', label: 'PR' },
  { value: 'PE', label: 'PE' },
  { value: 'PI', label: 'PI' },
  { value: 'RJ', label: 'RJ' },
  { value: 'RN', label: 'RN' },
  { value: 'RS', label: 'RS' },
  { value: 'RO', label: 'RO' },
  { value: 'RR', label: 'RR' },
  { value: 'SC', label: 'SC' },
  { value: 'SP', label: 'SP' },
  { value: 'SE', label: 'SE' },
  { value: 'TO', label: 'TO' },
]

export interface PaymentData {
  cardHolder: string
  cardNumber: string
  city: string
  complement: string
  expirationMonth: string
  expirationYear: string
  number: string
  securityCode: string
  state: string
  street: string
  zip: string
}

export interface PaymentProps {
  free: boolean
  paymentData: PaymentData
  onInputChange: (paymentDataProp: keyof PaymentData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

const FormSection: SFC<{ label?: string, separator?: boolean }> = ({ children, label = '', separator = true }) => (
  <div className={`flex flex-wrap ${separator ? 'pb6 bb b--muted-4 mb6' : ''}`}>
    {label && <p className="mt0 mb7">{label}</p>}
    {children}
  </div>
)

const FormLine: SFC<{ label?: string }> = ({ children, label = '' }) => (
  <Fragment>
    {label && <p className="f6 mt0 mb3">{label}</p>}
    <div className="mb5 w-100 flex justify-center">
      {children}
    </div>
  </Fragment>
)

class Payment extends Component<PaymentProps & InjectedIntlProps> {
  public render () {
    const { formatMessage } = this.props.intl
    const { onInputChange, paymentData } = this.props

    return (
      <div className="w-third-ns w-100 h-100 mr5 mb5 br2 bg-base pa5">
		    <h4 className="fw4 ma0 mb7">{formatMessage({ id: 'extensions.checkout.payment-info.title' })}</h4>
        {
          this.props.free ? (
            <div className="tc c-muted-1 pb5 lh-copy">
              {formatMessage({ id: 'extensions.checkout.payment-info.free-message' })}
            </div>
          ) : (
            <Fragment>
              <FormSection>
                <FormLine>
                  <Input
                    value={paymentData.cardNumber}
                    label={formatMessage({ id: 'extensions.checkout.payment-info.card-number' })}
                    onChange={onInputChange('cardNumber')}
                  />
                </FormLine>
                <FormLine>
                  <Input
                    value={paymentData.cardHolder}
                    label={formatMessage({ id: 'extensions.checkout.payment-info.card-holder' })}
                    onChange={onInputChange('cardHolder')}
                  />
                </FormLine>
                <FormLine label={formatMessage({ id: 'extensions.checkout.payment-info.expiration-date' })}>
                  <div className="mr5 w-50">
                    <Input
                      value={paymentData.expirationMonth}
                      placeholder={formatMessage({ id: 'extensions.checkout.payment-info.expiration-date.placeholder.month' })}
                      onChange={onInputChange('expirationMonth')}
                    />
                  </div>
                  <div className="w-50">
                    <Input
                      value={paymentData.expirationYear}
                      placeholder={formatMessage({ id: 'extensions.checkout.payment-info.expiration-date.placeholder.year' })}
                      onChange={onInputChange('expirationYear')}
                    />
                  </div>
                </FormLine>
                <div className="w-50 pr3">
                  <Input
                    value={paymentData.securityCode}
                    label={formatMessage({ id: 'extensions.checkout.payment-info.security-code' })}
                    placeholder="123"
                    onChange={onInputChange('securityCode')}
                  />
                </div>
              </FormSection>
              <FormSection label={formatMessage({ id: 'extensions.checkout.payment-info.billing-address.title' })} separator={false}>
                <FormLine>
                  <div className="w-third mr5">
                    <Input
                      value={paymentData.zip}
                      label={formatMessage({ id: 'extensions.checkout.payment-info.billing-address.zip' })}
                      onChange={onInputChange('zip')}
                    />
                  </div>
                  <div className="w-two-thirds">
                    <Input
                      value={paymentData.street}
                      label={formatMessage({ id: 'extensions.checkout.payment-info.billing-address.address' })}
                      onChange={onInputChange('street')}
                    />
                  </div>
                </FormLine>
                <FormLine>
                  <div className="w-third mr5">
                    <Input
                      value={paymentData.number}
                      label={formatMessage({ id: 'extensions.checkout.payment-info.billing-address.number' })}
                      onChange={onInputChange('number')}
                    />
                  </div>
                  <div className="w-two-thirds">
                    <Input
                      value={paymentData.complement}
                      label={formatMessage({ id: 'extensions.checkout.payment-info.billing-address.address-2' })}
                      onChange={onInputChange('complement')}
                    />
                  </div>
                </FormLine>
                <FormLine>
                  <div className="w-two-thirds mr5">
                    <Input
                      value={paymentData.city}
                      label={formatMessage({ id: 'extensions.checkout.payment-info.billing-address.city' })}
                      onChange={onInputChange('city')}
                    />
                  </div>
                  <div className="w-third">
                    <Dropdown
                      value={paymentData.state}
                      label={formatMessage({ id: 'extensions.checkout.payment-info.billing-address.state' })}
                      options={states}
                      onChange={onInputChange('state')}
                    />
                  </div>
                </FormLine>
              </FormSection>
            </Fragment>
          )
        }
      </div>
    )
  }
}

export default injectIntl(Payment)
