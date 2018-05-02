import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'

import appProductQuery from './queries/appProductQuery.gql'

import { imagePath } from './utils/utils'
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
  }

  componentDidUpdate(prevProps) {
    const { appProduct } = this.props.appProductQuery
    if (this.props.appProductQuery !== prevProps.appProductQuery &&
      appProduct) {
      window.document.title = appProduct.name
    }
  }

  render() {
    const { appProductQuery } = this.props
    const { appProduct } = appProductQuery
    return (
      <div className="w-100 h-100 flex justify-center content">
        {appProduct ? (
          <div className="w-100 w-70-ns">
            <ProductHeader
              id={appProduct.linkText}
              registry={appProduct.registry}
              imageUrl={imagePath(appProduct)}
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
    },
  }),
}

export default compose(
  graphql(appProductQuery, optionsProduct),
  withPrefetch()
)(ProductPage)
