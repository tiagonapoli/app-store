import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { compose, graphql } from 'react-apollo'
import Button from '@vtex/styleguide/lib/Button'

import NoPermissionModal from './NoPermissionModal'
import buyAppMutation from '../mutations/buyAppMutation.gql'
import workspaces from '../queries/workspaces.gql'
import createWorkspace from '../mutations/createWorkspace.gql'

// GET ACCOUNT FROM USER
const account = 'extensions'

class ConfirmButton extends Component {
  static propTypes = {
    appName: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    buyApp: PropTypes.func.isRequired,
    createWorkspace: PropTypes.func,
    workspaces: PropTypes.object,
    intl: intlShape.isRequired,
  }

  state = {
    isModalOpen: false,
  }

  createDraftWorkspace = () => {
    const {
      appName,
      createWorkspace,
      workspaces: { workspaces },
    } = this.props
    const DRAFT = 'draft'
    window.location.href = installApp
    const installApp = `https://${DRAFT}--${account}.myvtex.com/admin/extensions/${appName}/i`
    if (workspaces.find(({ name }) => DRAFT === name)) {
      window.location.href = installApp
    } else {
      createWorkspace({
        variables: {
          account,
          workspace: DRAFT,
        },
      })
        .then(() => {
          window.location.href = installApp
        })
        .catch(e => {
          window.alert(this.translate('buyError'))
        })
    }
  }

  handleClick = () => {
    this.createDraftWorkspace()
    const { buyApp, appName } = this.props
    buyApp({ variables: { appName, termsOfUseAccepted: true } })
      .then(() => {
        this.createDraftWorkspace()
      })
      .catch(e => {
        this.handleModal()
      })
  }

  handleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

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
export default compose(
  graphql(buyAppMutation, { name: 'buyApp' }),
  graphql(createWorkspace, { name: 'createWorkspace' }),
  graphql(workspaces, {
    name: 'workspaces',
    options: {
      ssr: false,
      variables: {
        account: account,
      },
    },
  }),
  injectIntl
)(ConfirmButton)
