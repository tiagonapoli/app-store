import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { isMobileOnly } from 'react-device-detect'

import productsQuery from './queries/productsQuery.gql'

import Loading from './components/Loading'
import AppItem from './components/AppItem'

class AppGallery extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    homePage: PropTypes.bool,
    productPage: PropTypes.bool,
    category: PropTypes.string,
    collection: PropTypes.string,
    specificationFilters: PropTypes.arrayOf(PropTypes.string),
    from: PropTypes.number,
    to: PropTypes.number,
    product: PropTypes.object,
  }

  render() {
    const { data, homePage, productPage } = this.props
    const { error, loading, products } = data
    if (productPage && isMobileOnly) return null
    return (
      <div className="w-100 flex justify-center">
        {!error &&
          <div className="w-90 flex justify-center">
            {loading ? (
              <div className="flex justify-center pt9 pb10">
                <Loading />
              </div>
            ) : (
              <div
                className={`mw9 w-100 flex flex-column-s flex-row-l flex-wrap-ns justify-center items-center ${
                  homePage ? 'relative card-top' : 'mv4'
                }`}
              >
                {products.map(product => (
                  <AppItem
                    key={product.productId}
                    name={product.productName}
                    imageUrl={product.items && product.items[0].images[0].imageUrl}
                    shortDescription={product.description}
                    category={
                      product.categories && product.categories.length && product.categories.length > 0
                        ? product.categories[0]
                        : ''
                    }
                    seller={product.brand}
                    appId={product.linkText}
                    specifications={product.jsonSpecifications}
                    isShelf={false}
                  />
                ))}
              </div>
            )}
          </div>
        }
      </div>
    )
  }
}

const defaultOptions = {
  options: props => ({
    variables: {
      query: props.searchTerm,
      category: props.category ||
        props.product && props.product.categoriesIds && props.product.categoriesIds.length > 0 &&
        props.product.categoriesIds[0].substring(1, props.product.categoriesIds[0].length - 1),
      collection: props.collection,
      specificationFilters: props.specificationFilters || null,
      from: props.from || 0,
      to: props.to || 2,
    },
  }),
}

export default graphql(productsQuery, defaultOptions)(AppGallery)
