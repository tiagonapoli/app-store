import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'

import availableAppQuery from './queries/availableAppQuery.gql'
import productQuery from './queries/productQuery.gql'

import ProductDescription from './components/ProductDescription'
import ProductHeader from './components/ProductHeader'
import withPrefetch from './withPrefetch'

class ProductPage extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    productQuery: PropTypes.object,
    appQuery: PropTypes.object,
    prefetch: PropTypes.func.isRequired,
  }

  state = {
    isModalOpen: false,
  }

  componentDidMount() {
    this.props.prefetch('store/review')
    const { productQuery: { product } } = this.props
    if (product) {
      this.fetchApp(product.items[0].referenceId[0].Value)
    }
  }

  componentDidUpdate() {
    const { productQuery: { product } } = this.props
    if (product) {
      this.fetchApp(product.items[0].referenceId[0].Value)
    }
  }

  fetchApp = id => {
    this.props.appQuery.refetch({
      id: `smartcheckout:${id}`,
      skip: false,
    })
  }

  render() {
    const { productQuery, appQuery } = this.props
    const { product } = productQuery
    const { availableApp } = appQuery
    return (
      <div className="flex justify-center">
        {availableApp && (
          <div className="w-100 w-70-ns">
            <ProductHeader
              id={product.items[0].referenceId[0].Value}
              registry={availableApp.registry}
              imageUrl={product.items[0].images[0].imageUrl}
              name={availableApp.name}
              seller={availableApp.vendor}
              price={product.items[0].sellers[0].commertialOffer.ListPrice}
              category={availableApp.categories[0]}
            />
            <div className="flex justify-center">
              <div className="w-100 w-80-ns">
                <ProductDescription
                  id={product.items[0].referenceId[0].Value}
                  description={availableApp.fullDescription}
                  registry={availableApp.registry}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const optionsProduct = {
  name: 'productQuery',
  options: props => ({
    variables: {
      slug: props.params.id,
    },
  }),
}

const optionsApp = {
  name: 'appQuery',
  options: {
    variables: {
      id: '',
      skip: true,
    },
  },
}

export default compose(
  graphql(productQuery, optionsProduct),
  graphql(availableAppQuery, optionsApp),
  withPrefetch()
)(ProductPage)
