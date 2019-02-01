import React, { ChangeEvent, Component, EventHandler, Fragment, MouseEvent } from 'react'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { Button, Checkbox, IconEdit, Input } from 'vtex.styleguide'

const binaryMutedStyle = (disabled: boolean) => `c-muted-${disabled ? '2' : '1'}`
const binaryMarginStyle = (moreMargin: boolean) => moreMargin ? 'mb6' : 'mb5'

const initialState = {
  detailed: false,
  editable: false,
  stateInscription: '',
  stateInscriptionExempt: true,
}

type BillingInfoState = typeof initialState

class BillingInfo extends Component<InjectedIntlProps, BillingInfoState> {
  readonly state = initialState

  render () {
    const { editable, detailed } = this.state
    const mutedText = binaryMutedStyle(editable)
    const dynamicMargin = binaryMarginStyle(editable)
    return (
      <div className="w-33-ns w-100 mr5 mb5 br2 bg-base pa5 h-100">
        <div className="flex justify-between items-center mb7">
          <h4 className="fw4 ma0"><FormattedMessage id="extensions.checkout.billing-info.title" /></h4>
          {!editable && <a className="ma0 c-muted-3 pointer" onClick={this.showEditable}><IconEdit /></a>}
        </div>
        <p className={`fw6 mt0 mb2 ${mutedText}`}><FormattedMessage id="extensions.checkout.billing-info.account" /></p>
        <p className={`fw4 mt0 ${dynamicMargin} ${mutedText}`}>Redley</p>
        {detailed || editable ? this.ExpandedForm() : this.ShowDetailsLink()}
        <p className={`fw6 mt0 mb2 ${mutedText}`}><FormattedMessage id="extensions.checkout.billing-info.name" /></p>
        <p className={`fw4 mt0 ${dynamicMargin} ${mutedText}`}>Joe Zoo</p>
        <p className={`fw6 mt0 mb2 ${mutedText}`}><FormattedMessage id="extensions.checkout.billing-info.email" /></p>
        <p className={`fw4 ${editable ? 'mt0 mb5' : 'ma0'} ${mutedText}`}>joe@redley.com</p>
        {editable && this.EditableFormDialogButtons()}
      </div>
    )  
  } 
  
  ExpandedForm = () => {
    const { editable } = this.state
    const mutedText = binaryMutedStyle(editable)
    const dynamicMargin = binaryMarginStyle(editable)
    return (
      <Fragment>
        <p className={`fw6 mt0 mb2 ${mutedText}`}><FormattedMessage id="extensions.checkout.billing-info.business-name" /></p>
        <p className={`fw4 mt0 ${dynamicMargin} ${mutedText}`}>BROCKTON INDUSTRIA E COMERCIO DE VESTUARIO E FACCOES LTDA</p>
        <p className={`fw6 mt0 mb2 ${mutedText}`}><FormattedMessage id="extensions.checkout.billing-info.fantasy-name" /></p>
        <p className={`fw4 mt0 ${dynamicMargin} ${mutedText}`}>Redley</p>
        <p className={`fw6 mt0 mb2 ${mutedText}`}><FormattedMessage id="extensions.checkout.billing-info.cnpj" /></p>
        <p className={`fw4 mt0 ${dynamicMargin} ${mutedText}`}>00.000.000/0000-00</p>
        {editable ? this.EditableForm() : this.UneditableForm()}
      </Fragment>
    )
  }

  EditableFormDialogButtons = () => (
    <div className="flex justify-between">
      <div className="mr3 w-50">
        <Button onClick={this.saveChanges} variation="tertiary" size="small" block>
          <FormattedMessage id="extensions.checkout.billing-info.button.cancel" />
        </Button>
      </div>
      <div className="w-50">
        <Button onClick={this.saveChanges} variation="primary" size="small" block>
          <FormattedMessage id="extensions.checkout.billing-info.button.save" />
        </Button>
      </div>
    </div>
  )

  ShowDetailsLink = () => (
    <a
      onClick={this.showDetails}
      className="fw4 mt0 mb6 c-link hover-c-link pb6 bb b--muted-4 mb6 db w-100 pointer"
    >
      Show details
    </a>
  )

  UneditableForm = () => (
    <Fragment>
      {this.state.stateInscriptionExempt ? <p className="f6 c-muted-1"><FormattedMessage id="extensions.checkout.billing-info.state-inscription-exempt" /></p> : this.StateInscriptionText()}
      <a onClick={this.hideDetails} className="fw4 mt0 mb6 c-link hover-c-link pb6 bb b--muted-4 mb6 db w-100 pointer">Hide details</a>
    </Fragment>
  )

  StateInscriptionText = () => (
    <Fragment>
      <p className="fw6 mt0 mb2 c-muted-1">
        <FormattedMessage id="extensions.checkout.billing-info.state-inscription" />
      </p>
      <p className={`fw4 mt0 ${binaryMarginStyle(this.state.editable)} c-muted-1`}>
        {this.state.stateInscription}
      </p>
    </Fragment>
  )

  EditableForm = () => (
    <div className="mb6 pb6 bb b--muted-4 db w-100">
      <p className="fw6 mt0 mb3">
        <FormattedMessage id="extensions.checkout.billing-info.state-inscription" />
      </p>
      <div className="mb3">
        <Input
          disabled={this.state.stateInscriptionExempt}
          value={this.state.stateInscription}
          placeholder={this.state.stateInscription || '000.000.000.000'}
          onChange={this.handleStateInscriptionChange}
        />
      </div>
      <Checkbox
        checked={this.state.stateInscriptionExempt}
        label={this.props.intl.formatMessage({ id: 'extensions.checkout.billing-info.state-inscription-exempt' })}
        onChange={this.handleStateInscriptionExempt}
        value="state-inscription-exempt"
        name="state-inscription-exempt-cb"
      />
    </div>
  )

  showEditable: EventHandler<MouseEvent<HTMLAnchorElement>> = 
    () => this.setState({ editable: true })

  showDetails: EventHandler<MouseEvent<HTMLAnchorElement>> =
    () => this.setState({ detailed: true })

  hideDetails: EventHandler<MouseEvent<HTMLAnchorElement>> =
    () => this.setState({ detailed: false })

  saveChanges: EventHandler<MouseEvent<HTMLButtonElement>> =
    () => this.setState({ editable: false, detailed: true })

  handleStateInscriptionExempt: EventHandler<ChangeEvent<HTMLInputElement>> =
    () => this.setState({ stateInscriptionExempt: !this.state.stateInscriptionExempt })

  handleStateInscriptionChange: EventHandler<ChangeEvent<HTMLInputElement>> =
    e => this.setState({ stateInscription: e.target.value })
}

export default injectIntl(BillingInfo)
