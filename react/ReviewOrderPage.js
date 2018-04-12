import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'

import availableAppQuery from './queries/availableAppQuery.gql'

class ReviewOrderPage extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    data: PropTypes.object,
  }

  render() {
    console.log(this.props.data)
    const { imageUrl, name, price } = this.props
    return (
      <div className="absolute-ns w-100 vh-100-s h-100-ns bg-light-silver tc">
        <div className="pv6-s mt9-ns mb6-ns near-black f4-s f2-ns fw3">
          Review your order
        </div>
        <div className="flex justify-center tl">
          <div className="w-90-s w-60-ns bg-white br2 shadow-2">
            <div className="flex flex-row">
              <div className="tl-s tc-m tl-l mr4-s mr0-m mh0-m ml4-l mr6-l w-25-m w-10-l">
                <img className="image-size br2" src={imageUrl} alt={name} />
              </div>
              <div className="w-75 flex flex-column justify-center lh-copy">
                <div className="f3-s f2-ns b near-black">{name}</div>
              </div>
            </div>
            <div>Total</div>
            <div>{price}</div>
            <div>Billing info</div>
          </div>
        </div>
      </div>
    )
  }
}

const options = {
  options: props => ({
    variables: {
      id: props.params.id,
      skip: false,
    },
  }),
}

export default graphql(availableAppQuery, options)(ReviewOrderPage)
