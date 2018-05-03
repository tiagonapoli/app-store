import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { compose, graphql } from 'react-apollo'
import Button from '@vtex/styleguide/lib/Button'

import Loading from './Loading'
import NoPermissionModal from './NoPermissionModal'
import buyAppMutation from '../mutations/buyAppMutation.gql'

class ConfirmButton extends Component {
  static propTypes = {
    appName: PropTypes.string.isRequired,
    billingPolicy: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    buyApp: PropTypes.func.isRequired,
    store: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
  }

  state = {
    isModalOpen: false,
    loading: false,
  }

  goToAdmin = () => {
    const { store, appName } = this.props
    window.location.href = `https://${store}.myvtex.com/admin/extensions/${appName}/install`
  }

  handleClick = () => {
    this.setState({ loading: true })
    const { buyApp, appName, billingPolicy } = this.props
    if (billingPolicy && billingPolicy.free) {
      return this.goToAdmin()
    }
    return buyApp({ variables: { appName, termsOfUseAccepted: true } })
      .then(this.createDraftWorkspace)
      .catch(this.handleModal)
      .finally(this.setState({ loading: false }))
  }

  handleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  render() {
    const { loading } = this.state
    const { value } = this.props
    return (
      <div className="w-100 tc">
        {loading ? (
          <Loading />
        ) : (
          <div className="bg-rebel-pink hover-bg-heavy-rebel-pink tc br2 w-100">
            <Button onClick={this.handleClick} block>
              <span className="white">{value}</span>
            </Button>
          </div>
        )}
        <NoPermissionModal
          onChange={this.handleModal}
          isOpen={this.state.isModalOpen}
        />
      </div>
    )
  }
}

export default compose(graphql(buyAppMutation, { name: 'buyApp' }), injectIntl)(
  ConfirmButton
)
