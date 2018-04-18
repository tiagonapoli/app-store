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
    const { name, imageUrl, shortDescription, category, seller, appId } = this.props
    return (
      <div className="w-90-s w-30-l mh5 h5 pointer" onClick={this.handleClick}>
        <Card>
          <div className="flex flex-row">
            <AppIcon imageUrl={imageUrl} name={name} />
            <div className="w-100 ml4"><div>{name}</div><div className="w-70"><GetButton appId={appId} homePage /></div></div>
          </div>
          <div className="h3 overflow-hidden">{shortDescription}</div>
          <AppCategory category={category} seller={seller} />
        </Card>
      </div>
    )
  }
}

export default withNavigate()(AppItem)
