import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import Button from '@vtex/styleguide/lib/Button'

import NoPermissionModal from './NoPermissionModal'
import buyAppMutation from '../mutations/buyAppMutation.gql'

class ConfirmButton extends Component {
  static propTypes = {
    appName: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    buyApp: PropTypes.func.isRequired,
  }

  state = {
    isModalOpen: false,
  }

  handleClick = () => {
    const { buyApp, appName } = this.props
    buyApp({ variables: { appName, termsOfUseAccepted: true } })
      .then(res => {
        console.log('%%%%%%%%%%%%%', res)
      })
      .catch(e => {
        console.log('ERROR', e)
        this.handleModal()
      })
  }

  handleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  render() {
    const { value } = this.props
    return (
      <div className="bg-rebel-pink hover-bg-heavy-rebel-pink tc br2 w-100">
        <Button onClick={this.handleClick} block>
          <span className="white">{value}</span>
        </Button>
        <NoPermissionModal
          onChange={this.handleModal}
          isOpen={this.state.isModalOpen}
        />
      </div>
    )
  }
}
export default graphql(buyAppMutation, { name: 'buyApp' })(ConfirmButton)
