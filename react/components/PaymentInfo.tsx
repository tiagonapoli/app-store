import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Input } from 'vtex.styleguide'

export default class PaymentInfo extends Component<{free: boolean}> {
  static propTypes = {
    free: PropTypes.bool.isRequired
  }

  public render () {
    return (
      <div className="w-33-ns w-100 mr5 mb5 br2 bg-base pa5">
		    <h4 className="fw4 ma0 mb7">Payment method</h4>
        {
          this.props.free ? (
            <div className="tc c-muted-1 pb5 lh-copy">Você já pode finalizar seu pedido. A sua compra é grátis</div>
          ) : (
            <div>
              <div className="pb6 bb b--muted-4 mb6">
                <p className="mt0 mb3">Número do cartão</p>
                <div className="mb5"><Input /></div>
                <p className="mt0 mb3">Nome impresso no cartão</p>
                <div className="mb5"><Input /></div>
                <p className="mt0 mb3">Data de expiração</p>
                <div className="flex justify-center mb5">
                  <div className="mr5"><Input placeholder="mês"/></div>
                  <div className=""><Input placeholder="ano"/></div>
                </div>
                <p className="mt0 mb3">Código de segurança</p>
                <div className="w-50 pr3"><Input /></div>
              </div>
              <p className="mt0 mb7">Endereço de Cobrança</p>
              <div className="flex mb5">
                <div className="w-33 mr5">
                  <p className="mt0 mb3">CEP</p>
                  <Input />
                </div>
                <div className="w-66">
                  <p className="mt0 mb3">Endereço</p>
                  <Input />
                </div>
              </div>
              <div className="flex mb5">
                <div className="w-33 mr5">
                  <p className="mt0 mb3">Número</p>
                  <Input />
                </div>
                <div className="w-66">
                  <p className="mt0 mb3">Complemento</p>
                  <Input />
                </div>
              </div>
              <div className="flex mb5">
                <div className="w-66 mr5">
                  <p className="mt0 mb3">Cidade</p>
                  <Input />
                </div>
                <div className="w-33">
                  <p className="mt0 mb3">UF</p>
                  <Dropdown
                    options={[
                      { value: 'RJ', label: 'RJ' },
                      { value: 'SP', label: 'SP' }
                    ]}
                  />
                </div>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}
