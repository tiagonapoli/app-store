import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AppIcon extends Component {
  static propTypes = {
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }

  render() {
    const { imageUrl, name } = this.props
    return <img className="image-size br2 light-shadow" src={imageUrl.replace('http://', 'https://')} alt={name} />
  }
}

export default AppIcon
