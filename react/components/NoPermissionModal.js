import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'
import Modal from '@vtex/styleguide/lib/Modal'

class NoPermissionModal extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    onChange: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  render() {
    const { onChange, isOpen } = this.props
    return (
      <Modal centered isOpen={isOpen} onClose={onChange}>
        <div className=" c-base-8">
          <div className="b f4 mb6-s mb5-ns">{this.translate('oops')}.</div>
          <div className="f5 mb6-s mb8-ns">
            <FormattedMessage
              id="extensions.noPermission"
              values={{
                purchasePermission: (
                  <a className="link b c-primary">
                    <FormattedMessage id="extensions.purchasePermission" />
                  </a>
                ),
              }}
            />
          </div>
          <div className="flex justify-center-s justify-end-ns tr">
            <div className="w-40-s w-20-ns br2">
              <Button onClick={onChange} primary block>Ok</Button>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

export default injectIntl(NoPermissionModal)
