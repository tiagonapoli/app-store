import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import Card from '@vtex/styleguide/lib/Card'
import Input from '@vtex/styleguide/lib/Input'

import appProductQuery from './queries/appProductQuery.gql'

import AppIcon from './components/AppIcon'
import Billing from './components/Billing'
import ConfirmButton from './components/ConfirmButton'
import Loading from './components/Loading'

class ReviewOrderPage extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    appProductQuery: PropTypes.object,
    profileQuery: PropTypes.object,
    intl: intlShape.isRequired,
  }

  state = {
    store: '',
  }

  componentDidUpdate(prevProps) {
    const { appProductQuery } = this.props
    if (
      appProductQuery !== prevProps.appProductQuery &&
      appProductQuery.appProduct
    ) {
      window.document.title = appProductQuery.appProduct.name
    }
  }

  componentDidMount() {
    this.setState({ store: window.localStorage.getItem('account') || '' })
    window.document.body.scrollTop = window.document.documentElement.scrollTop = 0
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  handleChange = ({ target: { value } }) => {
    this.setState({ store: value })
  }

  render() {
    const { store } = this.state
    const { appProductQuery } = this.props
    const { appProduct, loading } = appProductQuery
    const error = !store
    return (
      <div className="w-100 h-100 bg-light-silver tc pv6-s pt9-ns content">
        <div className="near-black f4-s f2-ns fw3 mt6 mb7">
          {this.translate('reviewOrder')}
        </div>
        <div className="flex justify-center tl">
          {loading ? (
            <div className="h-100 flex items-center content">
              <Loading />
            </div>
          ) : (
            <div className="mw7 w-90-s w-70-m w-50-l w-40-xl">
              <Card>
                <div className="pa0-s pa4-ns near-black">
                  <div className="flex flex-row mb5-s mb7-ns">
                    <AppIcon
                      imageUrl={appProduct.icon}
                      name={appProduct.name}
                    />
                    <div className="w-75 flex flex-column justify-center pl3-s pl5-ns lh-title">
                      <div className="f3-s f2-ns b">{appProduct.name}</div>
                    </div>
                  </div>
                  <div className="fw6 f5">Total</div>
                  <div className="mt3 mb6-s mb7-ns">
                    <Billing billingOptions={appProduct.billing} />
                  </div>
                  <div className="mb7">
                    <div className="fw6 f5">
                      {this.translate('accountInfo')}
                    </div>
                    <div className="mt3 f5">{this.translate('storeText')}</div>
                    <div className="pt3 w-100">
                      <Input
                        placeholder={this.translate('accountName')}
                        onChange={this.handleChange}
                        value={store}
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
                            target="_blank"
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
                  <div className="dn-s flex-ns justify-center w-100 mt5">
                    <ConfirmButton
                      store={store}
                      appName={appProduct.slug}
                      billingPolicy={appProduct.billing}
                      value={this.translate('confirmButton')}
                      disabled={error}
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
                  store={store}
                  appName={appProduct.slug}
                  billingPolicy={appProduct.billing}
                  value={this.translate('confirmButtonMobile')}
                  disabled={error}
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

export default compose(
  graphql(appProductQuery, { ...options, name: 'appProductQuery' }),
  injectIntl
)(ReviewOrderPage)
