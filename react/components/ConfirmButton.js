import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { Button } from 'vtex.styleguide'
import { compose, graphql } from 'react-apollo'
import { compose as composeR, dropLast, last, reduce, split, toPairs } from 'ramda'
import Cookies from 'js-cookie'

import Loading from './Loading'
import checkAccount from '../mutations/checkAccount.gql'

const createQueryString = composeR(
  dropLast(1),
  reduce((queryString, [attr, value]) => `${queryString}${attr}=${value}&`, '?'),
  toPairs
)

const getOrderFormIdFromCookie = compose(last, split('='))

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
    const { checkAccount, appName, store, sellerId, skuId } = this.props
    const orderFormId = getOrderFormIdFromCookie(Cookies.get('checkout.vtex.com'))
    checkAccount({
      variables: {
        store
      }
    }).then(() => {
      const expiryDate = new Date()
      expiryDate.setYear(expiryDate.getFullYear() + 1)
      const billingInfoQueryString = createQueryString({
        orderFormId,
        skuId,
        sellerId,
        appId: appName,
        referrer: 'APP_STORE'
      })
      window.location.href = `https://${store}.myvtex.com/billing-info${billingInfoQueryString}`
    }).catch((e) => {
      // TODO: paint the account input border red
      throw e
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
  graphql(checkAccount, { 'name': 'checkAccount' }),
  injectIntl
)(ConfirmButton)
