const locator = id => {
  const [name, fullVersion] = id.split('@')
  const [version, build] = fullVersion.split('+')
  return { name, version, build }
}

const removeBuild = fullVersion => {
  const [version] = fullVersion.split('+')
  return version
}

export { removeBuild, locator }
