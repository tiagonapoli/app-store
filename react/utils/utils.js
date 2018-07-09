export function removeSlashes(text) {
  return text
    .split('/')
    .filter(t => !!t)
    .pop()
}

export function imagePath(availableApp, image) {
  const { registry, slug, version, icon } = availableApp
  return `/_v/render/v5/assets/published/${registry}/${slug}@${version}/${image ||
    icon}`
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

export const splitLocale = locale => locale.split('-')[0]

export const getReferenceId = product =>
  product &&
  product.items &&
  product.items.length > 0 &&
  product.items[0].referenceId &&
  product.items[0].referenceId.length > 0 &&
  product.items[0].referenceId[0].Value
