import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from '@vtex/styleguide/lib/Card'

import { tryParseJson } from './utils/utils'
import AppCategory from './components/AppCategory'
import AppIcon from './components/AppIcon'
import GetButton from './components/GetButton'
import withNavigate from './withNavigate'

class AppItem extends Component {
  static propTypes = {
    appId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    seller: PropTypes.string.isRequired,
    specificationFilters: PropTypes.oneOf(['Published', 'Coming Soon']),
    specifications: PropTypes.string,
    navigate: PropTypes.func.isRequired,
    isShelf: PropTypes.bool.isRequired,
  }

  handleClick = e => {
    e.stopPropagation()
    const { navigate, appId } = this.props
    const options = {
      params: { slug: appId },
      page: 'store/product',
      fallbackToWindowLocation: false,
    }
    navigate(options)
  }

  checkIsComing = () => {
    const { specifications } = this.props
    const specificationsMap = specifications && tryParseJson(specifications)
    return (
      specificationsMap &&
      specificationsMap.Status &&
      Array.isArray(specificationsMap.Status) &&
      specificationsMap.Status.length > 0 &&
      specificationsMap.Status[0] === 'Coming Soon'
    )
  }

  render() {
    const {
      name,
      imageUrl,
      shortDescription,
      category,
      seller,
      appId,
      specificationFilters,
      isShelf,
    } = this.props
    const isComing =
      specificationFilters === 'Coming Soon' || this.checkIsComing()
    return (
      <div
        onClick={!isComing ? this.handleClick : () => {}}
        className={`link no-underline db mt5-s mt0-ns ma4-s ma5-ns ${
          isShelf ? '' : 'w-90-s w-50-m w-30-l'
        } ${isComing ? '' : 'pointer card-hover'}`}
      >
        <Card>
          <div className="flex flex-row near-black">
            <AppIcon imageUrl={imageUrl} name={name} />
            <div className="w-100 ml5 flex flex-column justify-center lh-copy">
              <div className="h2 overflow-y-hidden f4 fw5 mb4-ns">{name}</div>
              {!isComing && (
                <div className="w-50-s w-60-ns">
                  <GetButton appId={appId} homePage />
                </div>
              )}
            </div>
          </div>
          <div className="description-height ">
            <div className="mv5 overflow-hidden f5 fw4 dark-gray track-1 block-with-text">
              {shortDescription}
            </div>
          </div>
          <AppCategory category={category} seller={seller} homePage />
        </Card>
      </div>
    )
  }
}

export default withNavigate()(AppItem)
