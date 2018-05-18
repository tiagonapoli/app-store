import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { NoSSR } from 'render'
import { isMobileOnly } from 'react-device-detect'
import Slider from 'vtex.storecomponents/Slider'

import './slider.global.css'

import productsQuery from './queries/productsQuery.gql'

import Loading from './components/Loading'
import AppItem from './AppItem'

const DEFAULT_SHELF_ITEM_WIDTH = 281
const DOTS_LARGE_VIEWPORT = true
const SLIDES_TO_SCROLL_LARGE_VIEWPORT = 1

const BREAKPOINT_MOBILE_VIEWPORT = 480
const SLIDER_CENTER_MODE_MOBILE = false
const ARROWS_MOBILE_VIEWPORT = false
const DOTS_MOBILE_VIEWPORT = true
const SLIDES_TO_SCROLL_MOBILE_VIEWPORT = 1
const SLIDES_TO_SHOW_MOBILE_VIEWPORT = 5

const BREAKPOINT_EXTRA_SMALL_MOBILE_VIEWPORT = 300
const DOTS_EXTRA_SMALL_MOBILE_VIEWPORT = true
const SLIDER_CENTER_MODE_EXTRA_SMALL_MOBILE = false

class AppShelf extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    collection: PropTypes.string,
    specificationFilters: PropTypes.string.isRequired,
    from: PropTypes.number,
    to: PropTypes.number,
    title: PropTypes.string.isRequired,
  }

  getSliderSettings = () => {
    return {
      slidesToShow: 3,
      slidesToScroll: SLIDES_TO_SCROLL_LARGE_VIEWPORT,
      dots: DOTS_LARGE_VIEWPORT,
      touchThreshold: 25,
      arrows: false,
      responsive: [
        {
          breakpoint: BREAKPOINT_MOBILE_VIEWPORT,
          settings: {
            slidesToShow: SLIDES_TO_SHOW_MOBILE_VIEWPORT,
            slidesToScroll: SLIDES_TO_SCROLL_MOBILE_VIEWPORT,
            arrows: ARROWS_MOBILE_VIEWPORT,
            dots: DOTS_MOBILE_VIEWPORT,
            centerMode: SLIDER_CENTER_MODE_MOBILE,
          },
        },
        {
          breakpoint: BREAKPOINT_EXTRA_SMALL_MOBILE_VIEWPORT,
          settings: {
            slidesToShow: SLIDES_TO_SHOW_MOBILE_VIEWPORT,
            slidesToScroll: SLIDES_TO_SCROLL_MOBILE_VIEWPORT,
            arrows: ARROWS_MOBILE_VIEWPORT,
            dots: DOTS_EXTRA_SMALL_MOBILE_VIEWPORT,
            centerMode: SLIDER_CENTER_MODE_EXTRA_SMALL_MOBILE,
          },
        },
      ],
    }
  }

  render() {
    const { data, specificationFilters, title } = this.props
    const { loading, products } = data
    const isScrollByPage = false
    const sliderSettings = this.getSliderSettings()
    return (
      <div className="w-100 pt5 pb8">
        <div className="w-100 mt7-s mv7-ns f4 dark-gray normal ttu tc">
          {title}
        </div>
        {loading ? (
          <div className="flex justify-center pt9 pb10">
            <Loading />
          </div>
        ) : (
          <div className="w-100">
            {isMobileOnly ? (
              <NoSSR onSSR={<Loading />}>
                <Slider
                  ref={function(c) {
                    this._slick = c
                  }.bind(this)}
                  sliderSettings={sliderSettings}
                  scrollByPage={isScrollByPage}
                  defaultItemWidth={DEFAULT_SHELF_ITEM_WIDTH}
                >
                  {products.map(product => (
                    <AppItem
                      key={product.productId}
                      name={product.productName}
                      imageUrl={product.items[0].images[0].imageUrl}
                      shortDescription={product.description}
                      category={
                        product.categories[product.categories.length - 1]
                      }
                      seller={product.brand}
                      appId={product.linkText}
                      specificationFilters={specificationFilters}
                      isShelf={isMobileOnly}
                    />
                  ))}
                </Slider>
              </NoSSR>
            ) : (
              <div className="flex flex-column-s flex-row-l flex-wrap-ns items-center mv4">
                {products.map(product => (
                  <AppItem
                    key={product.productId}
                    name={product.productName}
                    imageUrl={product.items[0].images[0].imageUrl}
                    shortDescription={product.description}
                    category={product.categories[product.categories.length - 1]}
                    seller={product.brand}
                    appId={product.linkText}
                    specificationFilters={specificationFilters}
                    isShelf={isMobileOnly}
                  />
                ))}
              </div>
            )}
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
      specificationFilters: `specificationFilter_25:${encodeURI(
        props.specificationFilters
      )}`,
      from: props.from || 0,
      to: props.to || 2,
    },
  }),
}

export default graphql(productsQuery, defaultOptions)(AppShelf)
