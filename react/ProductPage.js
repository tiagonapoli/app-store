import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'

import productQuery from './queries/productQuery.gql'

import ProductDescription from './components/ProductDescription'
import ProductHeader from './components/ProductHeader'
import withPrefetch from './withPrefetch'

class ProductPage extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    data: PropTypes.object,
    prefetch: PropTypes.func.isRequired,
  }

  state = {
    isModalOpen: false,
  }

  componentDidMount() {
    this.props.prefetch('store/home')
  }

  handleChange = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  render() {
    const { data } = this.props
    const { product, loading } = data
    return (
      <div className="flex justify-center">
        {!loading && (
          <div className="w-100 w-70-ns">
            <ProductHeader
              imageUrl={product.items[0].images[0].imageUrl}
              name={product.items[0].nameComplete}
              seller={product.items[0].sellers[0].sellerName}
              price={product.items[0].sellers[0].commertialOffer.ListPrice}
            />
            <div className="flex justify-center">
              <div className="w-100 w-80-ns">
                <ProductDescription description={product.description} />
              </div>
            </div>
          </div>
        )}
      </div>
    )
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
