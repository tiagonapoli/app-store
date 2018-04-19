import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from '@vtex/styleguide/lib/Card'

import AppCategory from './AppCategory'
import AppIcon from './AppIcon'
import GetButton from './GetButton'
import withNavigate from '../withNavigate'

class AppItem extends Component {
  static propTypes = {
    appId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    seller: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
  }

  handleClick = () => {
    const { navigate, appId } = this.props
    const options = {
      params: { slug: appId },
      page: 'store/product',
      fallbackToWindowLocation: false,
    }
    navigate(options)
  }

  render() {
    const {
      name,
      imageUrl,
      shortDescription,
      category,
      seller,
      appId,
    } = this.props
    return (
      <div
        className="w-90-s w-50-m w-30-l mh5 h5 pointer"
        onClick={this.handleClick}
      >
        <Card>
          <div className="flex flex-row near-black">
            <AppIcon imageUrl={imageUrl} name={name} />
            <div className="w-100 ml5 flex flex-column justify-center lh-copy">
              <div className="f4 fw5">{name}</div>
              <div className="w-50-s w-60-ns">
                <GetButton appId={appId} homePage />
              </div>
            </div>
          </div>
          <div className="description-height mv5 overflow-hidden f5 fw3 lh-copy">
            {shortDescription}
          </div>
          <AppCategory category={category} seller={seller} homePage />
        </Card>
      </div>
    )
  }
}

export default withNavigate()(AppItem)
