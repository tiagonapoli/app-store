import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'

import Loading from './Loading'
import NoPermissionModal from './NoPermissionModal'

class ConfirmButton extends Component {
  static propTypes = {
    appName: PropTypes.string.isRequired,
    billingPolicy: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    store: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    intl: intlShape.isRequired,
  }

  state = {
    isModalOpen: false,
    loading: false,
  }

  handleClick = () => {
    const { store, appName } = this.props
    window.location.href = `https://${store.toLowerCase()}.myvtex.com/admin/extensions/${appName}/install`
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
          <div className="bg-rebel-pink hover-bg-heavy-rebel-pink tc br2 w-100 mw6">
            <Button onClick={this.handleClick} block disabled={disabled}>
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

export default injectIntl(ConfirmButton)
