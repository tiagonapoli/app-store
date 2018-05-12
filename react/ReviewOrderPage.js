import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import Button from '@vtex/styleguide/lib/Button'
import Card from '@vtex/styleguide/lib/Card'

import appProductQuery from './queries/appProductQuery.gql'

import AppIcon from './components/AppIcon'
import Billing from './components/Billing'
import ConfirmButton from './components/ConfirmButton'
import Loading from './components/Loading'
import StoreModal from './components/StoreModal'

class ReviewOrderPage extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    appProductQuery: PropTypes.object,
    profileQuery: PropTypes.object,
    intl: intlShape.isRequired,
  }

  state = {
    store: '',
    shouldShowStoreModal: false,
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

  handleStoreModal = () => {
    this.setState({ shouldShowStoreModal: !this.state.shouldShowStoreModal })
  }

  handleStoreName = store => {
    this.setState({ store, shouldShowStoreModal: false })
  }

  render() {
    const { store, shouldShowStoreModal } = this.state
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
                    <div className="w-75 flex flex-column justify-center pl3-s pl5-ns lh-copy">
                      <div className="f3-s f2-ns b">{appProduct.name}</div>
                    </div>
                  </div>
                  <div className="f5">Total</div>
                  <div className="mt3 mb6-s mb7-ns">
                    <Billing billingOptions={appProduct.billing} />
                  </div>
                  {!error && (
                    <div className="mb7">
                      <div className="f5">{this.translate('accountInfo')}</div>

                      <div className="ma3">
                        <div className="fw5 f4 ttc">{store}</div>
                        <div className="lh-copy f6">
                          <FormattedMessage
                            id="extensions.accountInfoText"
                            values={{
                              store: <span className="b">{store}</span>,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
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
                    {error ? (
                      <div className="tc br2 w-100 w-80-ns bg-light-silver hover-bg-light-gray">
                        <Button block onClick={this.handleStoreModal}>
                          <span className="rebel-pink">
                            {this.translate('storeError')}
                          </span>
                        </Button>
                      </div>
                    ) : (
                      <ConfirmButton
                        store={store}
                        appName={appProduct.slug}
                        billingPolicy={appProduct.billing}
                        value={this.translate('confirmButton')}
                      />
                    )}
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
                {error ? (
                  <div
                    className="pointer tc rebel-pink hover-heavy-rebel-pink"
                    onClick={this.handleStoreModal}
                  >
                    {this.translate('storeError')}
                  </div>
                ) : (
                  <ConfirmButton
                    store={store}
                    appName={appProduct.slug}
                    billingPolicy={appProduct.billing}
                    value={this.translate('confirmButtonMobile')}
                  />
                )}
              </div>
            </div>
          )}
        </div>
        <StoreModal
          isOpen={shouldShowStoreModal}
          onClose={this.handleStoreModal}
          onChange={this.handleStoreName}
        />
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
