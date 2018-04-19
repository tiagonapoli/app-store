import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedNumber } from 'react-intl'

class Billing extends Component {
  static propTypes = {
    billing: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  render() {
    const { billing } = this.props
    const isFixed = !billing.free && billing.policies[0].billing.items[0].fixed
    const isFixedOnly =
      isFixed && billing.policies[0].billing.items.length === 0
    const metricsIndex = isFixed ? 1 : 0
    return (
      <div className="f4 normal near-black">
        {billing.free ? (
          this.translate('free')
        ) : isFixedOnly ? (
          <FormattedNumber
            value={billing.policies[0].billing.items[0].fixed}
            style="currency"
            currency={billing.policies[0].billing.items[0].itemCurrency}
            minimumFractionDigits={2}
            maximumFractionDigits={2}
          />
        ) : (
          <div>
            {isFixed ? (
              <div>
                <FormattedNumber
                  value={billing.policies[0].billing.items[0].fixed}
                  style="currency"
                  currency={billing.policies[0].billing.items[0].itemCurrency}
                  minimumFractionDigits={2}
                  maximumFractionDigits={2}
                />
                <span>+</span>
              </div>
            ) : (
              <div>
                {billing.policies[0].billing.items[
                  metricsIndex
                ].calculatedByMetricUnit.ranges.map(range => (
                  <div key={range.exclusiveFrom}>
                    {' '}
                    <FormattedNumber
                      value={range.multiplier}
                      style="currency"
                      currency={
                        billing.policies[0].billing.items[metricsIndex]
                          .itemCurrency
                      }
                      minimumFractionDigits={2}
                      maximumFractionDigits={2}
                    />
                    <span>/</span>
                    {
                      billing.policies[0].billing.items[metricsIndex]
                        .calculatedByMetricUnit.metricName
                    }{' '}
                    {range.exclusiveFrom} to {range.inclusiveTo || '*'}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default injectIntl(Billing)
