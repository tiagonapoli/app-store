import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'

import appProductQuery from './queries/appProductQuery.gql'
import Loading from './components/Loading'
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

  componentDidUpdate(prevProps) {
    const { appProductQuery } = this.props
    if (
      appProductQuery !== prevProps.appProductQuery &&
      appProductQuery.appProduct
    ) {
      window.document.title = appProductQuery.appProduct.name
    }
  }

  render() {
    const { appProductQuery } = this.props
    const { appProduct } = appProductQuery
    return (
      <div className="w-100 h-100 flex justify-center content">
        {appProduct ? (
          <div className="w-100 w-70-ns mw8">
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
          </div>
        ) : (
          <div className="h-100 flex items-center content">
            <Loading />
          </div>
        )}
      </div>
    )
  }
}

const optionsProduct = {
  name: 'appProductQuery',
  options: props => ({
    variables: {
      slug: props.params.slug,
      locale: global.__RUNTIME__.culture.locale,
    },
  }),
}

export default compose(
  graphql(appProductQuery, optionsProduct),
  withPrefetch()
)(ProductPage)
