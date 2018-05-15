import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import productsQuery from './queries/productsQuery.gql'

import { tryParseJson } from './utils/utils'
import Loading from './components/Loading'
import AppItem from './AppItem'

class AppShelf extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    collection: PropTypes.string,
    specificationFilters: PropTypes.arrayOf(PropTypes.string),
    from: PropTypes.number,
    to: PropTypes.number,
    title: PropTypes.string.isRequired,
  }

  getStatus = product => {
    const specificationsMap = product.jsonSpecifications && tryParseJson(product.jsonSpecifications)
    return specificationsMap &&
      specificationsMap.Status &&
      Array.isArray(specificationsMap.Status) &&
      specificationsMap.Status.length > 0 &&
      specificationsMap.Status[0]
  }

  filterProducts = (products, filter) => {
    return products.filter(product => this.getStatus(product) === filter)
  }

  render() {
    const { data, specificationFilters, title } = this.props
    const { loading, products } = data
    const filteredProducts = specificationFilters
      ? this.filterProducts(products, specificationFilters[0])
      : products
    return (
      <div className="w-100">
        <div className="w-100 mt7-s mv7-ns f4 dark-gray normal ttu tc">{title}</div>
        {loading ? (
          <div className="flex justify-center pt9 pb10">
            <Loading />
          </div>
        ) : (
          <div
            className="flex flex-column-s flex-row-l flex-wrap-ns items-center mv4"
          >
            {filteredProducts.map(product => (
              <AppItem
                key={product.productId}
                name={product.productName}
                imageUrl={product.items[0].images[0].imageUrl}
                shortDescription={product.description}
                category={product.categories[product.categories.length - 1]}
                seller={product.brand}
                appId={product.linkText}
                specificationFilters={specificationFilters && specificationFilters[0]}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
}

const defaultOptions = {
  options: props => ({
    variables: {
      query: props.query,
      collection: props.collection,
      specificationFilters: props.specificationFilters,
      from: props.from || 0,
      to: props.to || 2,
    },
  }),
}

export default graphql(productsQuery, defaultOptions)(AppShelf)
