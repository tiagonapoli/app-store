import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import AppCategory from './AppCategory'
import AppIcon from './AppIcon'
import GetButton from './GetButton'

class ProductHeader extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    seller: PropTypes.string.isRequired,
    category: PropTypes.string,
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  render() {
    const { id, imageUrl, name, category, seller } = this.props
    return (
      <div className="flex flex-row mt5-s mt8-ns pb3-s pb6-ns mb6 mh4-s mh0-ns b--light-gray bb">
        <div className="mr5">
          <AppIcon imageUrl={imageUrl} name={name} />
        </div>
        <div className="w-75 flex flex-column justify-center lh-title">
          <div className="f3-s f2-ns b near-black">{name}</div>
          <AppCategory category={category} seller={seller} />
        </div>
        <div className="dn flex-ns flex-column-ns justify-center items-end w-20 lh-copy">
          <GetButton appId={id} />
        </div>
      </div>
    )
  }
}

export default injectIntl(ProductHeader)
