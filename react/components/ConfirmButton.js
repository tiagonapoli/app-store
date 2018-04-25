import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
  }

  state = {
    isModalOpen: false,
  }

  createDraftWorkspace = () => {
    const {
      createWorkspace,
      workspaces: { workspaces },
    } = this.props
    const DRAFT = 'draft'
    console.log('%%%%%%%%%%%%%%', workspaces)
    if (workspaces.find(({ name }) => DRAFT === name)) {
      window.location.href = `${DRAFT}--${account}.myvtex.com/admin/extensions`
    } else {
      createWorkspace({
        variables: {
          account,
          workspace: DRAFT,
        },
      })
        .then(() => {
          window.location.href = `${DRAFT}--${account}.myvtex.com/admin/extensions`
        })
        .catch(e => {
          console.error(`Failed to create workspace: ${e}`)
          window.alert(
            `There was an error creating workspace '${DRAFT}'. Please reload this page and try again shortly.`
          )
        })
    }
  }

  handleClick = () => {
    const { buyApp, appName } = this.props
    buyApp({ variables: { appName, termsOfUseAccepted: true } })
      .then(res => {
        console.log('%%%%%%%%%%%%%', res)
      })
      .catch(e => {
        console.log('ERROR', e)
        this.createDraftWorkspace()
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
  })
)(ConfirmButton)
