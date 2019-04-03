import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import { Helmet } from 'vtex.render-runtime'

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
    productQuery: PropTypes.object,
    culture: PropTypes.object.isRequired,
    prefetch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.prefetch('store.review')
    window.document.body.scrollTop = window.document.documentElement.scrollTop = 0
  }

  mergeAppProduct = () => {
    const {
      productQuery: {product, loading: productLoading},
      availableAppQuery: { availableApp, loading: availableAppLoading },
    } = this.props
    return !availableAppLoading && !productLoading && {
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
    }
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
            <div className="flex">
              <div className="mw7 pr9-ns w-100">
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
  options: ({productQuery: {product, loading}}) => {
    return {
      variables: {
        id: product && product.items[0].referenceId[0].Value,
        skip: loading || product == null,
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
