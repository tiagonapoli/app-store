import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'
import Input from '@vtex/styleguide/lib/Input'
import Modal from '@vtex/styleguide/lib/Modal'

class LoginModal extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
  }

  state = {
    store: '',
  }

  handleClick = () => {
    const { store } = this.state
    window.location.href = `https://sso.vtex.com/_v/sso?scope=vtex&an=${store}&returnUrl=https://extensions.vtex.com/?an=${store}`
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ store: value })
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  render() {
    const { store } = this.state
    const { isOpen, onClose } = this.props
    return (
      <Modal centered isOpen={isOpen} onClose={onClose}>
        <div className=" c-base-8">
          <div className="fw3 f3 mv4">{this.translate('loginModalText')}</div>
          <div className="w-100 flex flex-column flex-row-ns pv6">
            <div className="w-100 w-70-ns pb4-s pb0-ns pr4-ns">
              <Input onChange={this.handleChange} value={store} />
            </div>
            <div className="w-100-s w-30-ns br2 tc">
              <Button onClick={this.handleClick} primary block>
                {this.translate('login')}
              </Button>
            </div>
          </div>
          <div className="w-100 f5 fw3 tc bt b--base-3 pt6">
            <FormattedMessage
              id="extensions.newToVTEX"
              values={{
                createYourAccount: (
                  <a className="link normal c-primary">
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

export default injectIntl(LoginModal)