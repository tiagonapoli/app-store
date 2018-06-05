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
      <div className="w3 flex items-center ml2 mr3">
        <button
          className="link pa0 mv2 bg-transparent bn flex items-center pointer mr3 near-black"
          onBlur={this.handleBlur}
          onClick={this.handleButtonClick}>
          <GlobeIcon size={11} colorFill="white" />
          <span className="f5 fw5 pl2 white">{selectedLocale.text}</span>
          <div className={`pt2 ${opened ? 'rotate-270' : 'rotate-90'}`}>
            <BackIcon size={12} colorFill="white" />
          </div>
        </button>
        <ul className={listClasses}>
          {locales.map(
            ({ id, text }) =>
              id !== selectedLocale.id ? (
                <li
                  key={id}
                  id={`appframe-locale@${id}`}
                  className="pointer serious-black f5 pv3 ph6 hover-bg-light-silver tc"
                  onClick={this.handleLocaleClick}
                  onMouseDown={this.handleMouseDown}>
                  {text}
                </li>
              ) : null
          )}
        </ul>
      </div>
    )
  }
}

export default withCulture()(withEmitter()(LocaleSwitcher))
