import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import marksy from 'marksy'
import memoize from 'memoize-one'
import { Slider } from 'vtex.store-components'

import { imagePath, splitLocale } from '../utils/utils'
import Billing from './Billing'
import GetButton from './GetButton'
import withCulture from '../withCulture'

import '../slider.global.css'

const DOTS_LARGE_VIEWPORT = true
const SLIDES_TO_SCROLL_LARGE_VIEWPORT = 1

const BREAKPOINT_MOBILE_VIEWPORT = 480
const SLIDER_CENTER_MODE_MOBILE = false
const DOTS_MOBILE_VIEWPORT = true
const SLIDES_TO_SCROLL_MOBILE_VIEWPORT = 1
const SLIDES_TO_SHOW_MOBILE_VIEWPORT = 1

const BREAKPOINT_EXTRA_SMALL_MOBILE_VIEWPORT = 300
const DOTS_EXTRA_SMALL_MOBILE_VIEWPORT = true
const SLIDER_CENTER_MODE_EXTRA_SMALL_MOBILE = false

/* eslint-disable react/display-name, react/prop-types */
const compile = memoize(description => marksy({
  createElement,
  elements: {
    h2: ({ children }) => <h2 className="f4-ns f5 fw7">{children}</h2>,
    ul: ({ children }) => <ul className="f5 list pl0 pr3">{children}</ul>,
    li: ({ children }) => (
      <li className="mb3 lh-copy flex flex-row">
        <div className="mr3"><svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <react width="12" height="12" fill="white"/>
              <path d="M8 3H4C3.44772 3 3 3.44772 3 4V8C3 8.55228 3.44772 9 4 9H8C8.55228 9 9 8.55228 9 8V4C9 3.44772 8.55228 3 8 3Z" stroke="#3F3F40" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
        </div>
        {children}
      </li>
    ),
    strong: ({ children }) => <span className="fw5">{children}</span>,
    a: ({ href, title, children }) => (
      <a
        className="link pointer fw5 rebel-pink hover-heavy-rebel-pink"
        target="_blank"
        href={href}
        title={title}
      >
        {children}
      </a>
    ),
  },
})(description))
/* eslint-disable react/display-name, react/prop-types */

class ProductDescription extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    billing: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired,
    culture: PropTypes.object.isRequired,
  }

  state = {
    fixed: true,
  }

  slick = React.createRef()

  componentDidMount() {
    window.addEventListener('scroll', this.watchScroll)
    this.watchScroll()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.watchScroll)
  }

  getSliderSettings = () => {
    return {
      slidesToShow: 1,
      slidesToScroll: SLIDES_TO_SCROLL_LARGE_VIEWPORT,
      dots: DOTS_LARGE_VIEWPORT,
      touchThreshold: 50,
      arrows: true,
      responsive: [
        {
          breakpoint: BREAKPOINT_MOBILE_VIEWPORT,
          settings: {
            slidesToShow: SLIDES_TO_SHOW_MOBILE_VIEWPORT,
            slidesToScroll: SLIDES_TO_SCROLL_MOBILE_VIEWPORT,
            dots: DOTS_MOBILE_VIEWPORT,
            arrows: false,
            centerMode: SLIDER_CENTER_MODE_MOBILE,
          },
        },
        {
          breakpoint: BREAKPOINT_EXTRA_SMALL_MOBILE_VIEWPORT,
          settings: {
            slidesToShow: SLIDES_TO_SHOW_MOBILE_VIEWPORT,
            slidesToScroll: SLIDES_TO_SCROLL_MOBILE_VIEWPORT,
            dots: DOTS_EXTRA_SMALL_MOBILE_VIEWPORT,
            arrows: false,
            centerMode: SLIDER_CENTER_MODE_EXTRA_SMALL_MOBILE,
          },
        },
      ],
    }
  }

  watchScroll = () => {
    const scroll = window.pageYOffset
    const scrollHeight = document.body.scrollHeight
    const footerSize = document.getElementById('extension-store-footer')
      .offsetHeight
    const fixed =
      document.documentElement.offsetHeight > window.innerHeight
        ? scroll < scrollHeight - footerSize - window.innerHeight
        : false
    if (fixed !== this.state.fixed) {
      this.setState({
        fixed,
      })
    }
  }

  render() {
    const { billing, description, id, screenshots, appProduct, culture: { locale } } = this.props
    const isScrollByPage = false
    const sliderSettings = this.getSliderSettings()
    const compiledDescription = compile(description).tree
    return (
      <div className="mh5-s mh0-ns near-black f5">
        <Billing billingOptions={billing} />
        <div className="pt5 pb3-s pb7-ns lh-copy">
          { compiledDescription }
        </div>
        {screenshots && (
          <div className="w-100 pb7 pb9-ns">
            <Slider
              ref={this.slick}
              sliderSettings={sliderSettings}
              scrollByPage={isScrollByPage}
            >
              {screenshots[splitLocale(locale)].map(screenshot => (
                <div key={screenshot}>
                  <div className="h7 flex justify-center bg-light-silver">
                    <img
                      className="screenshot"
                      src={imagePath(appProduct, screenshot)}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
        <div>
          <div
            className={`bottom-0 left-0 w-100 z-2 db-s dn-ns b--white bb pb3-s bw2 get-button-shadow bg-white ${
              this.state.fixed ? 'fixed pb4 ph6' : ''
            }`}
          >
            <GetButton appId={id} />
          </div>
        </div>
      </div>
    )
  }
}

export default withCulture()(ProductDescription)
