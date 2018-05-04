import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import productsQuery from './queries/productsQuery.gql'

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

  render() {
    const { data, specificationFilters, title } = this.props
    const { loading, products } = data
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
            {products.map(product => (
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
