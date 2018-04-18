import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import productsQuery from './queries/productsQuery.gql'

import Loading from './components/Loading'
import AppItem from './components/AppItem'

class AppShelf extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  render() {
    const { data } = this.props
    console.log(data)
    const { loading, products } = data
    return (
      <div className="bg-light-silver pv5">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-column-s flex-row-l items-center">
            {products.map(product => (
              <AppItem
                key={product.productId}
                name={product.productName}
                imageUrl={product.items[0].images[0].imageUrl}
                shortDescription={product.description}
                category={product.categories[0]}
                seller={product.brand}
                appId={product.linkText}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
}

const defaultOptions = {
  options: {
    variables: {
      from: 0,
      quantity: 8,
      orderBy: 'OrderByTopSaleDESC',
    },
  },
}

export default graphql(productsQuery, defaultOptions)(AppShelf)
