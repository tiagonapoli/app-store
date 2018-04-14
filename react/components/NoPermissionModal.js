import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'

class NoPermissionModal extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  render() {
    const { onClose } = this.props
    return (
      <div className="near-black">
        <div className="b f4 mb6-s mb5-ns">{this.translate('oops')}.</div>
        <div className="f5 mb6-s mb8-ns">
          <FormattedMessage
            id="extensions.noPermission"
            values={{
              purchasePermission: (
                <a className="link b rebel-pink">
                  {this.translate('purchasePermission')}
                </a>
              ),
            }}
          />
        </div>
        <div className="flex justify-center-s justify-end-ns tr">
          <div className="w-40-s w-20-ns bg-rebel-pink br2">
            <Button onClick={onClose} block>
              <span className="white">Ok</span>
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(NoPermissionModal)
