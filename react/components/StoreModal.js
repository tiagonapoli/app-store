import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'
import Input from '@vtex/styleguide/lib/Input'
import Modal from '@vtex/styleguide/lib/Modal'

import withCulture from '../withCulture'

class LoginModal extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    culture: PropTypes.object.isRequired,
  }

  state = {
    store: '',
  }

  handleClick = () => {
    const { store } = this.state
    window.localStorage.setItem('account', store.toLowerCase())
    this.props.onClose()
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ store: value })
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  render() {
    const { store } = this.state
    const { isOpen, onClose, culture } = this.props
    return (
      <Modal centered isOpen={isOpen} onClose={onClose}>
        <div className="near-black">
          <div className="fw3 f3 mv4">{this.translate('storeModalText')}</div>
          <div className="w-100 flex flex-column flex-row-ns pv6">
            <div className="w-100 w-70-ns pb4-s pb0-ns pr4-ns">
              <Input onChange={this.handleChange} value={store} />
            </div>
            <div className="w-100-s w-30-ns bg-rebel-pink br2 tc">
              <Button onClick={this.handleClick} block>
                <span className="white">{this.translate('login')}</span>
              </Button>
            </div>
          </div>
          <div className="w-100 f5 fw3 tc bt b--light-silver pt6">
            <FormattedMessage
              id="extensions.newToVTEX"
              values={{
                createYourAccount: (
                  <a
                    target="_blank"
                    className="link normal rebel-pink"
                    href={`https://www.vtex.com/${culture.locale}/-1cz/contato`}
                  >
                    <FormattedMessage id="extensions.createYourAccount" />
                  </a>
                ),
              }}
            />
          </div>
        </div>
      </Modal>
    )
  }
}

export default withCulture()(injectIntl(LoginModal))
