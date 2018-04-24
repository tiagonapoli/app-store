import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import Card from '@vtex/styleguide/lib/Card'

import appProductQuery from './queries/appProductQuery.gql'

import { imagePath } from './utils/utils'
import AppIcon from './components/AppIcon'
import Billing from './components/Billing'
import BillingInfo from './components/BillingInfo'
import ConfirmButton from './components/ConfirmButton'
import Loading from './components/Loading'

class ReviewOrderPage extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    data: PropTypes.object,
    intl: intlShape.isRequired,
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  render() {
    const { data } = this.props
    const { appProduct, loading } = data
    return (
      <div className="w-100 bg-light-silver tc pb10-ns">
        <div className="pv6-s pt9-ns mb6-ns near-black f4-s f2-ns fw3">
          {this.translate('reviewOrder')}
        </div>
        <div className="flex justify-center tl">
          {loading ? (
            <Loading />
          ) : (
            <div className="w-90-s w-70-m w-50-l w-40-xl">
              <Card>
                <div className="pa0-s pa4-ns near-black">
                  <div className="flex flex-row mb5-s mb7-ns">
                    <AppIcon
                      imageUrl={imagePath(appProduct)}
                      name={appProduct.name}
                    />
                    <div className="w-75 flex flex-column justify-center pl3-s pl5-ns lh-copy">
                      <div className="f3-s f2-ns b">{appProduct.name}</div>
                    </div>
                  </div>
                  <div className="f5">Total</div>
                  <div className="mt3 mb6-s mb7-ns">
                    <Billing billing={appProduct.billing} />
                  </div>
                  <div className="mb7-s mb8-ns">
                    <div className="f5">Billing info</div>
                    <div className="mv3 mb3-s mb5-ns">
                      <BillingInfo
                        name="Bill Zoo"
                        email="bill@redley.com"
                        store="Redley"
                        pictureUrl="https://hindizenblog.files.wordpress.com/2009/03/harshil-gudka-379676.jpg"
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
                          <a className="pointer link rebel-pink">
                            <FormattedMessage id="extensions.termsOfService" />
                          </a>
                        ),
                        privacyPolice: (
                          <a
                            href={
                              appProduct.billing
                                ? appProduct.billing.termsURL
                                : ''
                            }
                            className="pointer link rebel-pink"
                          >
                            <FormattedMessage id="extensions.privacyPolice" />
                          </a>
                        ),
                      }}
                    />
                  </div>
                  <div className="dn-s db-ns w-100 mt5">
                    <ConfirmButton
                      appName={appProduct.slug}
                      value={this.translate('confirmButton')}
                    />
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
                <ConfirmButton
                  appName={appProduct.slug}
                  value={this.translate('confirmButtonMobile')}
                />
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
      slug: props.params.slug,
    },
  }),
}

export default compose(graphql(appProductQuery, options), injectIntl)(
  ReviewOrderPage
)
