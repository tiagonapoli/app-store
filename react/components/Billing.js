import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

class Billing extends Component {
  static propTypes = {
    billingOptions: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  formatPrice = (value, currency, fractionDigits) =>
    this.props.intl.formatNumber(value, {
      currency,
      style: 'currency',
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    })

  metricInitials = metricName =>
    metricName
      .split(' ')
      .reduce((acc, value) => acc + value.substring(0, 1), '')

  render() {
    const { billingOptions } = this.props
    const isFixed =
      !billingOptions.free && billingOptions.policies[0].billing.items[0].fixed
    const isFixedOnly =
      isFixed && billingOptions.policies[0].billing.items.length === 1
    const metricsIndex = isFixed ? 1 : 0
    const ranges =
      !billingOptions.free &&
      !isFixedOnly &&
      billingOptions.policies[0].billing.items[metricsIndex]
        .calculatedByMetricUnit &&
      billingOptions.policies[0].billing.items[metricsIndex]
        .calculatedByMetricUnit.ranges
    const metricName =
      !billingOptions.free &&
      !isFixedOnly &&
      billingOptions.policies[0].billing.items[metricsIndex]
        .calculatedByMetricUnit &&
      billingOptions.policies[0].billing.items[metricsIndex]
        .calculatedByMetricUnit.metricName
    return (
      <div className="ph5 br3 bg-light-silver normal near-black">
        {billingOptions.free || isFixedOnly ? (
          <div className="w-100 flex flex-row pv5">
            <div className="w-10 f5 normal">{this.translate('price')}</div>
            <div className="w-90 tr f5 b">
              {billingOptions.free
                ? this.translate('free')
                : isFixedOnly && (
                  <div className="w-100 flex flex-row justify-end">
                    {this.formatPrice(
                      billingOptions.policies[0].billing.items[0].fixed,
                      billingOptions.policies[0].billing.items[0]
                        .itemCurrency,
                      2
                    )}
                    <span className="normal ml2 ttl">
                      {this.translate('monthly')}
                    </span>
                  </div>
                )}
            </div>
          </div>
        ) : (
          <div className="w-100">
            <div className="w-100 db dn-ns pt4">{this.translate('price')}</div>
            {ranges.map((range, index) => (
              <div
                key={range.exclusiveFrom}
                className="w-100 lh-copy flex flex-row justify-end"
              >
                <div
                  className={`w-10 f5 normal pv4 mr3 ${
                    index === 0 ? 'dn db-ns' : 'dn'
                  }`}
                >
                  {this.translate('price')}
                </div>
                <div
                  className={`w-100 w-90-ns flex flex-column-s flex-row-ns pv4 ${
                    index !== ranges.length - 1 ? 'bb b--white' : ''
                  }`}
                >
                  <div className="w-100 w-90-ns flex flex-row flex-wrap">
                    {isFixed && (
                      <div className="b mr2">
                        {this.formatPrice(
                          billingOptions.policies[0].billing.items[0].fixed,
                          billingOptions.policies[0].billing.items[0]
                            .itemCurrency,
                          0
                        )}
                        <span className="ml2 normal">+</span>
                      </div>
                    )}
                    <div className="b">
                      {this.formatPrice(
                        range.multiplier,
                        billingOptions.policies[0].billing.items[metricsIndex]
                          .itemCurrency,
                        2
                      )}
                      <span className="mh2 normal">
                        {this.translate('per')}
                      </span>
                    </div>
                    <span className="i mr2">{metricName}</span>
                    <span className="b ttl">
                      ({range.inclusiveTo ? (
                        <span>
                          {range.exclusiveFrom} {this.translate('to')}{' '}
                          {range.inclusiveTo}
                        </span>
                      ) : (
                        <span>
                          {this.translate('moreThan')} {range.exclusiveFrom}{' '}
                        </span>
                      )}
                      {this.metricInitials(metricName)})
                    </span>
                  </div>
                  <div className="flex justify-end-ns w-100 w-10-ns normal ml2-ns ttl">
                    {this.translate('monthly')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default injectIntl(Billing)
