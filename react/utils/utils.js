export function removeSlashes(text) {
  return !!text && text.replace(/\//g, '')
}

export function imagePath(availableApp) {
  const { registry, slug, version, icon } = availableApp
  return `/_v/render/v5/assets/published/${registry}/${slug}@${version}/${icon}`
}

export function tryParseJson(str) {
  let parsed = null
  try {
    if (str) {
      parsed = JSON.parse(str)
    }
  } catch (e) {
    console.log(e)
  }
  return parsed
}
