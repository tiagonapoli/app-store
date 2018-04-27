export function removeSlashes(text) {
  return !!text && text.replace(/\//g, '')
}

export function imagePath(availableApp) {
  const { registry, slug, version, icon } = availableApp
  return `/_v/render/v5/assets/published/${registry}/${slug}@${version}/${icon}`
}
