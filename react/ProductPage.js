import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import { Helmet } from 'render'

import appProductQuery from './queries/appProductQuery.gql'
import Loading from './components/Loading'
import AppGallery from './AppGallery'
import ProductDescription from './components/ProductDescription'
import ProductHeader from './components/ProductHeader'
import withPrefetch from './withPrefetch'

class ProductPage extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    appProductQuery: PropTypes.object,
    prefetch: PropTypes.func.isRequired,
  }

  state = {
    isModalOpen: false,
  }

  componentDidMount() {
    this.props.prefetch('store/review')
    window.document.body.scrollTop = window.document.documentElement.scrollTop = 0
  }

  render() {
    const { appProductQuery } = this.props
    const { appProduct } = appProductQuery
    return (
      <div className="w-100 h-100 flex flex-column items-center content">
        {appProduct ? (
          <div className="w-100 w-70-ns mw8 content">
            <ProductHeader
              id={appProduct.linkText}
              registry={appProduct.registry}
              imageUrl={appProduct.icon}
              name={appProduct.name}
              seller={appProduct.vendor}
              category={appProduct.categories ? appProduct.categories[0] : ''}
            />
            <div className="flex justify-center">
              <div className="w-100 w-80-ns">
                <ProductDescription
                  id={appProduct.linkText}
                  description={appProduct.fullDescription || ''}
                  registry={appProduct.registry}
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
        {appProduct &&
          <div className="w-100 relative dn flex-ns justify-center bottom-0 bg-light-silver">
            <div className="w-100 mw9">
              <AppGallery category={appProduct.categoryId || '1'} />
            </div>
          </div>
        }
      </div>
    )
  }
}

const optionsProduct = {
  name: 'appProductQuery',
  options: props => {
    return {
      variables: {
        slug: props.params.slug,
      },
    }
  },
}

export default compose(
  graphql(appProductQuery, optionsProduct),
  withCulture(),
  withEmitter(),
  withPrefetch()
)(ProductPage)
