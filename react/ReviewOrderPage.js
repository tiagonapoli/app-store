import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import {
  injectIntl,
  intlShape,
  FormattedNumber,
  FormattedMessage,
} from 'react-intl'

import Card from '@vtex/styleguide/lib/Card'

import availableAppQuery from './queries/availableAppQuery.gql'

import imagePath from './utils/imagePath'
import AppIcon from './components/AppIcon'
import BillingInfo from './components/BillingInfo'
import ConfirmButton from './components/ConfirmButton'
import withCulture from './withCulture'

class ReviewOrderPage extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    data: PropTypes.object,
    culture: PropTypes.shape({
      currency: PropTypes.string.isRequired,
    }).isRequired,
    intl: intlShape.isRequired,
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  render() {
    console.log(this.props.data)
    const { culture: { currency }, data } = this.props
    const { availableApp, loading } = data
    return (
      <div className="w-100 vh-100-s h-100-ns bg-light-silver tc pb10-ns">
        <div className="pv6-s pt9-ns mb6-ns near-black f4-s f2-ns fw3">
          {this.translate('reviewOrder')}
        </div>
        <div className="flex justify-center tl">
          {!loading && (
            <div className="w-90-s w-60-m w-40-l">
              <Card>
                <div className="pa0-s pa4-ns near-black">
                  <div className="flex flex-row mb5-s mb7-ns">
                    <div className="w-25-s w-20-ns">
                      <AppIcon
                        imageUrl={imagePath(availableApp)}
                        name={availableApp.name}
                      />
                    </div>
                    <div className="w-75 flex flex-column justify-center pl3-s pl2-ns lh-copy">
                      <div className="f3-s f2-ns b">{availableApp.name}</div>
                    </div>
                  </div>
                  <div className="f5">Total</div>
                  <div className="f3 b mt3 mb6-s mb7-ns">
                    <FormattedNumber
                      value={0}
                      style="currency"
                      currency={currency}
                      minimumFractionDigits={2}
                      maximumFractionDigits={2}
                    />
                  </div>
                  <div className="mb7-s mb9-ns">
                    <div className="f5">Billing info</div>
                    <div className="mv3 mb3-s mb5-ns">
                      <BillingInfo
                        name="Bill Zoo"
                        email="bill@redley.com"
                        store="Redley"
                        pictureUrl="https://i1.wp.com/www.metalinjection.net/wp-content/uploads/2014/08/Giraffe-Tongue-Orchestra.jpg?fit=700%2C525"
                      />
                    </div>
                  </div>
                  <div className="f6">
                    <FormattedMessage
                      id="extensions.confirmText"
                      values={{
                        confirmButton: (
                          <span>
                            <span className="dn dib-ns">
                              {this.translate('confirmButton')}
                            </span>
                            <span className="dib dn-ns">
                              {this.translate('confirmButtonMobile')}
                            </span>
                          </span>
                        ),
                        termsOfService: (
                          <a className="link rebel-pink">
                            {this.translate('termsOfService')}
                          </a>
                        ),
                        privacyPolice: (
                          <a className="link rebel-pink">
                            {this.translate('privacyPolice')}
                          </a>
                        ),
                      }}
                    />
                  </div>
                  <div className="dn-s db-ns w-100 mt5">
                    <ConfirmButton value={this.translate('confirmButton')} />
                  </div>
                  <div className="dn-s db-ns w-100 mt6 mb2 tc">
                    <FormattedMessage
                      id="extensions.installAndConfigure"
                      values={{
                        nextStep: (
                          <span className="b">
                            {this.translate('nextStep')}
                          </span>
                        ),
                      }}
                    />
                  </div>
                </div>
              </Card>
              <div className="db-s dn-ns w-100 mt7">
                <ConfirmButton value={this.translate('confirmButtonMobile')} />
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const options = {
  options: props => ({
    variables: {
      id: props.params.id,
      skip: false,
    },
  }),
}

export default compose(
  graphql(availableAppQuery, options),
  withCulture(),
  injectIntl
)(ReviewOrderPage)
