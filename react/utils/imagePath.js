export default function(availableApp) {
  const { registry, slug, version, icon } = availableApp
  return `/_v/render/v5/assets/published/${registry}/${slug}@${version}/${icon}`
}
