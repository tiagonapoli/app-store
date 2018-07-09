import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import { Helmet } from 'render'

import availableAppQuery from './queries/availableAppQuery.gql'
import ProductDescription from './components/ProductDescription'
import ProductHeader from './components/ProductHeader'
import Loading from './components/Loading'
import withCulture from './withCulture'
import withEmitter from './withEmitter'
import withPrefetch from './withPrefetch'
import { splitLocale } from './utils/utils'

class ProductContainer extends Component {
  static propTypes = {
    availableAppQuery: PropTypes.object,
    product: PropTypes.object,
    culture: PropTypes.object.isRequired,
    prefetch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.prefetch('store/review')
    window.document.body.scrollTop = window.document.documentElement.scrollTop = 0
  }

  mergeAppProduct = () => {
    const {
      product,
      availableAppQuery: { availableApp, loading },
    } = this.props
    return !loading ? {
      billing: availableApp.billingOptions,
      categories: product.categories,
      categoryId: product.categoryId,
      fullDescription: availableApp.fullDescription,
      screenshots: availableApp.screenshots,
      icon:
        product.items && product.items.length > 0
          ? product.items[0].images[0].imageUrl
          : `/_v/render/v5/assets/published/${availableApp.registry}/${availableApp.slug}@${availableApp.version}/public/metadata/icon.png`,
      id: product.items[0].referenceId[0].Value,
      linkText: product.linkText,
      name: product.productName,
      vendor: product.brand,
      version: availableApp.version,
      slug: availableApp.slug,
    } : null
  }

  render() {
    const {
      culture: { locale },
    } = this.props
    const appProduct = this.mergeAppProduct()
    return (
      <div className="w-100 h-100 flex flex-column items-center content">
        {appProduct ? (
          <div className="w-100 w-70-ns mw8 content mt8-ns">
            <ProductHeader
              id={appProduct.linkText}
              imageUrl={appProduct.icon}
              name={appProduct.name}
              seller={appProduct.vendor}
              category={appProduct.categories ? appProduct.categories[0] : ''}
            />
            <div className="flex justify-center">
              <div className="w-100 w-80-ns">
                <ProductDescription
                  id={appProduct.linkText}
                  description={appProduct.fullDescription[splitLocale(locale)] || ''}
                  billing={appProduct.billing}
                  screenshots={appProduct.screenshots}
                  appProduct={appProduct}
                />
              </div>
            </div>
            <Helmet><title>{appProduct.name}</title></Helmet>
          </div>
        ) : (
          <div className="h-100 flex items-center content">
            <Loading />
          </div>
        )}

      </div>)
  }
}

const options = {
  name: 'availableAppQuery',
  options: props => {
    return {
      variables: {
        id: props.product.items[0].referenceId[0].Value,
        skip: false,
      },
    }
  },
}

export default compose(
  graphql(availableAppQuery, options),
  withCulture(),
  withEmitter(),
  withPrefetch()
)(ProductContainer)
