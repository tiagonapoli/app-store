import React, { SFC } from 'react'

interface AppIconProps {
  imageUrl: string
  name: string
}

const AppIcon: SFC<AppIconProps> = ({ imageUrl, name }) => 
  <img className="image-size br2 light-shadow" src={imageUrl.replace('http://', 'https://')} alt={name} />

export default AppIcon
