import React, { Component, EventHandler, Fragment, MouseEvent, SFC } from 'react'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { linkClasses } from '../../utils/utils' 

export interface ProfileProps {
  profileData: {
    fantasyName: string
    userName: string
    userMail: string
    companyName: string
    cnpj: string
  }
}

const initialState = {
  expandedForm: false,
}

type ProfileState = typeof initialState

const Detail: SFC<{ label: string, value: string }> = ({ label, value }) => (
  <Fragment>
    <p className={`fw6 mt0 mb2 c-muted-1`}>{label}</p>
    <p className={`fw4 mt0 mb5 c-muted-1`}>{value}</p>
  </Fragment>
)

const Details: SFC<{ data: Array<{ label: string, value: string}> }> = ({ data }) => (
  <Fragment>
    {data.map(
      ({ label, value }) => <Detail label={label} value={value} key={label} />
    )}
  </Fragment>
)

class Profile extends Component<ProfileProps & InjectedIntlProps, ProfileState> {
  readonly state = initialState

  render () {
    const { expandedForm } = this.state
    const { formatMessage } = this.props.intl
    const {
      fantasyName,
      cnpj,
      companyName,
      userMail,
      userName,
    } = this.props.profileData
    return (
      <div className="w-33-ns w-100 mr5 mb5 br2 bg-base pa5 h-100">
        <h4 className="fw4 mt0 mh0 mb7">{formatMessage({ id: 'extensions.checkout.billing-info.title' })}</h4>
        <div className="pb6 bb b--muted-4 mb6 db w-100">
          <Details
            data={[
              { label: formatMessage({ id: 'extensions.checkout.billing-info.account' }), value: fantasyName },
            ]}
          />
          {
            expandedForm &&
            <Details
              data={[
                { label: formatMessage({ id: 'extensions.checkout.billing-info.business-name' }), value: companyName },
                { label: formatMessage({ id: 'extensions.checkout.billing-info.fantasy-name' }), value: fantasyName },
                { label: formatMessage({ id: 'extensions.checkout.billing-info.cnpj' }), value: cnpj },
              ]}
            />
          }
          <a onClick={this.toggleDetails} className={linkClasses}>{
            expandedForm ? 
            formatMessage({ id: 'extensions.checkout.billing-info.link.hide-details' }) :
            formatMessage({ id: 'extensions.checkout.billing-info.link.show-details' })
          }</a>
        </div>
        <Details
          data={[
            { label: formatMessage({ id: 'extensions.checkout.billing-info.name' }), value: userName },
            { label: formatMessage({ id: 'extensions.checkout.billing-info.email' }), value: userMail },
          ]}
        />
      </div>
    )  
  } 

  toggleDetails: EventHandler<MouseEvent<HTMLAnchorElement>> =
    () => this.setState({ expandedForm: !this.state.expandedForm })
}

export default injectIntl(Profile)
