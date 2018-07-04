import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import GlobeIcon from './icons/GlobeIcon'
import withCulture from '../withCulture'
import withEmitter from '../withEmitter'
import { splitLocale } from '../utils/utils'

const locales = [
  {
    id: 'en-US',
  },
  {
    id: 'pt-BR',
  },
  {
    id: 'es-AR',
  },
]

const findLocale = locale => {
  const localeObj = locales.find(
    ({ id }) => splitLocale(id) === splitLocale(locale)
  )
  return localeObj || locales[0]
}

class LocaleSwitcher extends Component {
  static propTypes = {
    culture: PropTypes.object.isRequired,
    emitter: PropTypes.object.isRequired,
  }

  state = {
    opened: false,
    selectedLocale: findLocale(this.props.culture.locale),
  }

  handleButtonClick = () => {
    this.setState(({ opened }) => ({ opened: !opened }))
  }

  handleLocaleClick = ({ target: { id } }) => {
    const { emitter } = this.props

    emitter.emit('localesChanged', id)
    this.setState({
      opened: false,
      selectedLocale: findLocale(id),
    })
  }

  handleBlur = () => {
    this.setState({ opened: false })
  }

  handleMouseDown = e => {
    e.preventDefault()
  }

  render() {
    const { opened, selectedLocale } = this.state
    const listClasses = classnames(
      'absolute z-5 list top-2 ph0 pv2 mh0 mv5 bg-white br2 light-shadow',
      { dn: !opened }
    )
    return (
      <div className="w2 flex items-center ml2 mr5">
        <button
          className="link pa0 bg-transparent bn flex items-center pointer near-black"
          onBlur={this.handleBlur}
          onClick={this.handleButtonClick}>
          <GlobeIcon size={11} colorFill="white" />
          <span className="f5 fw5 ttu pl2 white">{splitLocale(selectedLocale.id)}</span>
        </button>
        <ul className={listClasses}>
          {locales.map(
            ({ id }) =>
              id !== selectedLocale.id ? (
                <li
                  key={id}
                  id={id}
                  className="pointer serious-black f5 pv3 ph5 hover-bg-light-silver tc ttu"
                  onClick={this.handleLocaleClick}
                  onMouseDown={this.handleMouseDown}>
                  {splitLocale(id)}
                </li>
              ) : null
          )}
        </ul>
      </div>
    )
  }
}

export default withCulture()(withEmitter()(LocaleSwitcher))
