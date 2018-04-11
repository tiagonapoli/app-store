import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'

import withPrefetch from './withPrefetch'
import productQuery from './queries/productQuery.gql'

class ProductPage extends Component {
  static propTypes = {
    params: PropTypes.object,
    data: PropTypes.object,
    prefetch: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false,
    }
  }

  componentDidMount() {
    this.props.prefetch('store/home')
  }

  handleChange = () => {
    this.setState(state => {
      return { isModalOpen: !state.isModalOpen }
    })
  }

  render() {
    const { data } = this.props
    const { product, loading } = data

    return <div />
  }
}

const options = {
  options: props => ({
    variables: {
      slug: props.params.id,
    },
  }),
}

export default compose(graphql(productQuery, options), withPrefetch())(
  ProductPage
)
