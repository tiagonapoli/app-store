import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { Button } from 'vtex.styleguide'
import { compose, graphql } from 'react-apollo'
import { compose as composeR, dropLast, toPairs, reduce } from 'ramda'

import Loading from './Loading'
import createOrderForm from '../mutations/createOrderForm.gql'

const setCookies = cookieValuePairs => {
  window.document.cookie = reduce((cookiesString, [cookieName, value]) => `${cookiesString}${cookieName}=${value};`, '', toPairs(cookieValuePairs))
}

const createQueryString = composeR(
  dropLast(1),
  reduce((queryString, [attr, value]) => `${queryString}${attr}=${value}&`, '?'),
  toPairs
)

class ConfirmButton extends Component {
  static propTypes = {
    appName: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    store: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    intl: intlShape.isRequired,
    sellerId: PropTypes.string.isRequired,
    skuId: PropTypes.string.isRequired,
  }

  state = {
    isModalOpen: false,
    loading: false,
  }

  handleClick = () => {
    const { createOrderForm, appName, store, sellerId, skuId } = this.props
    createOrderForm({
      variables: {
        store
      }
    }).then(({ data: { createOrderForm: orderFormId} }) => {
      const expiryDate = new Date()
      expiryDate.setYear(expiryDate.getFullYear() + 1)
      setCookies({
        'checkout.vtex.com': `_ofid=${orderFormId}`,
        expires: expiryDate.toGMTString(),
      })
      const billingInfoQueryString = createQueryString({
        orderFormId,
        skuId,
        sellerId,
        appId: appName,
      })
      window.location.href = `https://${store}.myvtex.com/billing-info${billingInfoQueryString}`
    })
  }

  handleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  render() {
    const { loading } = this.state
    const { value, disabled } = this.props
    return (
      <div className="w-100 flex justify-center">
        {loading ? (
          <Loading />
        ) : (
          <div className={`tc br2 w-100 mw6 ${disabled ? 'bg-light-gray' : 'bg-rebel-pink hover-bg-heavy-rebel-pink'}`}>
            <Button
              size="small"
              variation="tertiary"
              onClick={this.handleClick}
              block
              disabled={disabled}>
              <span className="white">{value}</span>
            </Button>
          </div>
        )}
      </div>
    )
  }
}

export default compose(
  graphql(createOrderForm, { 'name': 'createOrderForm' }),
  injectIntl
)(ConfirmButton)
