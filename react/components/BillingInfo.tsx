import React, { Component } from 'react'
import { Button, Checkbox, IconEdit, Input } from 'vtex.styleguide'

const binaryMutedStyle = disabled => `c-muted-${disabled ? '2' : '1'}`
const binaryMarginStyle = moreMargin => moreMargin ? 'mb6' : 'mb5'

export default class BillingInfo extends Component<{}> {
  state = {
    editable: false,
    detailed: false,
    stateInscriptionExempt: true,
    stateInscription: ""
  }

  showEditable = () => {
    this.setState({ editable: true })
  }

  showDetails = () => {
    this.setState({ detailed: true })
  }

  hideDetails = () => {
    this.setState({ detailed: false })
  }

  saveChanges = () => {
    this.setState({ editable: false })
  }

  handleStateInscriptionExempt = () => {
    this.setState({ stateInscriptionExempt: !this.state.stateInscriptionExempt})
  }

  handleStateInscriptionChange = ({ target: { value } }) => {
    this.setState({ stateInscription: value })
  }

  public render () {
    const { editable, detailed, stateInscription, stateInscriptionExempt } = this.state
    const mutedText = binaryMutedStyle(editable)
    const dynamicMargin = binaryMarginStyle(editable)
    return (
      <div className="w-33-ns w-100 mr5 mb5 br2 bg-base pa5 h-100">
        <div className="flex justify-between items-center mb7">
          <h4 className="fw4 ma0">Billing Info</h4>
          {
            editable ? null : (
              <div className="ma0 c-muted-3" onClick={this.showEditable}>
                <IconEdit />
              </div>
            )
          }
        </div>
        <p className={`fw6 mt0 mb2 ${mutedText}`}>VTEX Account</p>
        <p className={`fw4 mt0 ${dynamicMargin} ${mutedText}`}>Redley</p>
        {
          detailed || editable ? (
            <div>
              <p className={`fw6 mt0 mb2 ${mutedText}`}>Razão Social</p>
              <p className={`fw4 mt0 ${dynamicMargin} ${mutedText}`}>BROCKTON INDUSTRIA E COMERCIO DE VESTUARIO E FACCOES LTDA</p>
              <p className={`fw6 mt0 mb2 ${mutedText}`}>Nome Fantasia</p>
              <p className={`fw4 mt0 ${dynamicMargin} ${mutedText}`}>Redley</p>
              <p className={`fw6 mt0 mb2 ${mutedText}`}>CNPJ</p>
              <p className={`fw4 mt0 ${dynamicMargin} ${mutedText}`}>00.000.000/0000-00</p>
              {
                editable ? (
                  <div className="mb6 pb6 bb b--muted-4 mb6 db w-100">
                    <p className="fw6 mt0 mb3">Inscrição Estadual</p>
                    <div className="mb3">
                      <Input
                        disabled={stateInscriptionExempt}
                        value={stateInscription}
                        placeholder={stateInscription === "" ? "000.000.000.000" : stateInscription}
                        onChange={this.handleStateInscriptionChange}
                      />
                    </div>
                    <Checkbox
                      checked={stateInscriptionExempt}
                      label="Isento de Inscrição Estadual"
                      onChange={this.handleStateInscriptionExempt}
                      value="state-inscription-exempt"
                      name="state-inscription-exempt-cb"
                    />
                  </div>
                ) : (
                  <div>
                    {
                      stateInscriptionExempt ? (
                      <p className="f6 c-muted-1">Isento de Inscrição Estadual</p>
                      ) : (
                      <div>
                        <p className="fw6 mt0 mb2 c-muted-1">Inscrição Estadual</p>
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
        <p className={`fw6 mt0 mb2 ${mutedText}`}>Name</p>
        <p className={`fw4 mt0 ${dynamicMargin} ${mutedText}`}>Joe Zoo</p>
        <p className={`fw6 mt0 mb2 ${mutedText}`}>Email</p>
        <p className={`fw4 ${editable ? 'mt0 mb5' : 'ma0'} ${mutedText}`}>joe@redley.com</p>
        {
          editable ? (
            <div className="flex justify-between">
              <div className="mr3 w-50">
                <Button onClick={this.saveChanges} variation="tertiary" size="small" block>
                  CANCEL
                </Button>
              </div>
              <div className="w-50">
                <Button onClick={this.saveChanges} variation="primary" size="small" block>
                  SAVE
                </Button>
              </div>
            </div>
          ): null
        }
      </div>
    )  
  }
}
