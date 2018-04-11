import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedNumber } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'

class ProductHeader extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    seller: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string,
  }

  static contextTypes = {
    culture: PropTypes.object,
  }

  translate = id => this.props.intl.formatMessage({ id: `extensions.${id}` })

  render() {
    const { imageUrl, name, category, seller, price } = this.props
    return (
      <div className="flex flex-row mt5-s mt8-ns pb3-s pb6-ns mb6 b--light-gray bb">
        <div className="tl-s tc-m tl-l mh3-s mh0-m ml4-l mr6-l w-25-m w-10-l">
          <img className="image-size br2" src={imageUrl} alt={name} />
        </div>
        <div className="w-75 flex flex-column justify-center lh-copy">
          <div className="f3-s f2-ns b near-black">{name}</div>
          <div className="f6-s f5-ns dark-gray">
            {category || 'Sales'}{' '}
            <span className="f9 light-gray mb2">&#9679;</span>{' '}
            {this.translate('developedBy')} {seller}
          </div>
        </div>
        <div className="dn flex-ns flex-column-ns justify-center items-end w-20 lh-copy">
          <div className="w-80 f4 normal near-black tc mv2">
            <FormattedNumber
              value={price}
              style="currency"
              currency={this.context.culture.currency}
              minimumFractionDigits={2}
              maximumFractionDigits={2}
            />
          </div>
          <div className="bg-rebel-pink tc br2 w-80">
            <Button>
              <span className="white">{this.translate('get')}</span>
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(ProductHeader)
