const locator = id => {
  const [name, fullVersion] = id.split('@')
  const [version, build] = fullVersion.split('+')
  return { name, version, build }
}

const removeBuild = fullVersion => {
  const [version] = fullVersion.split('+')
  return version
}

const matchAppId = id =>
  id.match(/^((.+):)?([^@]+)(@([^\+\s]+?)([\+\s]build\d+)?)?$/)

export { removeBuild, locator, matchAppId }
