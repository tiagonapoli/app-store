import React, { ChangeEvent, Component, EventHandler, MouseEvent } from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { Button, Checkbox, IconEdit, Input } from 'vtex.styleguide'

const binaryMutedStyle = (disabled: boolean) => `c-muted-${disabled ? '2' : '1'}`
const binaryMarginStyle = (moreMargin: boolean) => moreMargin ? 'mb6' : 'mb5'

export interface BillingInfoState {
  editable: boolean
  detailed: boolean
  stateInscriptionExempt: boolean
  stateInscription: string
}

class BillingInfo extends Component<InjectedIntlProps, BillingInfoState> {
  public state: BillingInfoState = {
    detailed: false,
    editable: false,
    stateInscription: '',
    stateInscriptionExempt: true,
  }

  public render () {
    const { editable, detailed, stateInscription, stateInscriptionExempt } = this.state
    const { formatMessage } = this.props.intl
    const mutedText = binaryMutedStyle(editable)
    const dynamicMargin = binaryMarginStyle(editable)
    return (
      <div className="w-33-ns w-100 mr5 mb5 br2 bg-base pa5 h-100">
        <div className="flex justify-between items-center mb7">
          <h4 className="fw4 ma0">
            {formatMessage({ id: 'extensions.checkout.billing-info.title' })}
          </h4>
          {
            editable ? null : (
              <div className="ma0 c-muted-3" onClick={this.showEditable}>
                <IconEdit />
              </div>
            )
          }
        </div>
        <p className={`fw6 mt0 mb2 ${mutedText}`}>{formatMessage({ id: 'extensions.checkout.billing-info.account' })}</p>
        <p className={`fw4 mt0 ${dynamicMargin} ${mutedText}`}>Redley</p>
        {
          detailed || editable ? (
            <div>
              <p className={`fw6 mt0 mb2 ${mutedText}`}>{formatMessage({ id: 'extensions.checkout.billing-info.business-name' })}</p>
              <p className={`fw4 mt0 ${dynamicMargin} ${mutedText}`}>BROCKTON INDUSTRIA E COMERCIO DE VESTUARIO E FACCOES LTDA</p>
              <p className={`fw6 mt0 mb2 ${mutedText}`}>{formatMessage({ id: 'extensions.checkout.billing-info.fantasy-name' })}</p>
              <p className={`fw4 mt0 ${dynamicMargin} ${mutedText}`}>Redley</p>
              <p className={`fw6 mt0 mb2 ${mutedText}`}>{formatMessage({ id: 'extensions.checkout.billing-info.cnpj' })}</p>
              <p className={`fw4 mt0 ${dynamicMargin} ${mutedText}`}>00.000.000/0000-00</p>
              {
                editable ? (
                  <div className="mb6 pb6 bb b--muted-4 mb6 db w-100">
                    <p className="fw6 mt0 mb3">{formatMessage({ id: 'extensions.checkout.billing-info.state-inscription' })}</p>
                    <div className="mb3">
                      <Input
                        disabled={stateInscriptionExempt}
                        value={stateInscription}
                        placeholder={stateInscription === '' ? '000.000.000.000' : stateInscription}
                        onChange={this.handleStateInscriptionChange}
                      />
                    </div>
                    <Checkbox
                      checked={stateInscriptionExempt}
                      label={formatMessage({ id: 'extensions.checkout.billing-info.state-inscription-exempt' })}
                      onChange={this.handleStateInscriptionExempt}
                      value="state-inscription-exempt"
                      name="state-inscription-exempt-cb"
                    />
                  </div>
                ) : (
                  <div>
                    {
                      stateInscriptionExempt ? (
                        <p className="f6 c-muted-1">{formatMessage({ id: 'extensions.checkout.billing-info.state-inscription-exempt' })}</p>
                      ) : (
                        <div>
                          <p className="fw6 mt0 mb2 c-muted-1">{formatMessage({ id: 'extensions.checkout.billing-info.state-inscription' })}</p>
                          <p className={`fw4 mt0 ${dynamicMargin} c-muted-1`}>{stateInscription}</p>
                        </div>
                      )
                    }
                    <a onClick={this.hideDetails} className="fw4 mt0 mb6 c-link hover-c-link pb6 bb b--muted-4 mb6 db w-100 pointer">Hide details</a>
                  </div>
                )
              }
            </div>
          ) : 
          (
            <div>
              <a onClick={this.showDetails} className="fw4 mt0 mb6 c-link hover-c-link pb6 bb b--muted-4 mb6 db w-100 pointer">Show details</a>
            </div>
          )
        }
        <p className={`fw6 mt0 mb2 ${mutedText}`}>{formatMessage({ id: 'extensions.checkout.billing-info.name' })}</p>
        <p className={`fw4 mt0 ${dynamicMargin} ${mutedText}`}>Joe Zoo</p>
        <p className={`fw6 mt0 mb2 ${mutedText}`}>{formatMessage({ id: 'extensions.checkout.billing-info.email' })}</p>
        <p className={`fw4 ${editable ? 'mt0 mb5' : 'ma0'} ${mutedText}`}>joe@redley.com</p>
        {
          editable ? (
            <div className="flex justify-between">
              <div className="mr3 w-50">
                <Button onClick={this.saveChanges} variation="tertiary" size="small" block>
                  {formatMessage({ id: 'extensions.checkout.billing-info.button.cancel' })}
                </Button>
              </div>
              <div className="w-50">
                <Button onClick={this.saveChanges} variation="primary" size="small" block>
                  {formatMessage({ id: 'extensions.checkout.billing-info.button.save' })}
                </Button>
              </div>
            </div>
          ): null
        }
      </div>
    )  
  }

  private showEditable: EventHandler<MouseEvent<HTMLDivElement>> = 
    () => this.setState({ editable: true })

  private showDetails: EventHandler<MouseEvent<HTMLAnchorElement>> =
    () => this.setState({ detailed: true })

  private hideDetails: EventHandler<MouseEvent<HTMLAnchorElement>> =
    () => this.setState({ detailed: false })

  private saveChanges: EventHandler<MouseEvent<HTMLButtonElement>> =
    () => this.setState({ editable: false })

  private handleStateInscriptionExempt: EventHandler<ChangeEvent<HTMLInputElement>> =
    () => this.setState({ stateInscriptionExempt: !this.state.stateInscriptionExempt })

  private handleStateInscriptionChange: EventHandler<ChangeEvent<HTMLInputElement>> =
    e => this.setState({ stateInscription: e.target.value })
}

export default injectIntl(BillingInfo)
