import axios from 'axios'
import { IOContext } from 'colossus'
import { juxt, map, toPairs } from 'ramda'

const knownNotPG = [
  'allSpecifications',
  'description',
  'items',
  'productId',
  'productName',
  'link',
  'linkText',
  'productReference',
]

const objToNameValue = (
  keyName: string,
  valueName: string,
  record: Record<string, any>
) =>
  map(
    ([key, value]) => ({ [keyName]: key, [valueName]: value }),
    toPairs(record)
  )

const resolvers = {
  items: product => {
    return map(sku => {
      return { ...sku }
    }, product.items || [])
  },

  specificationFilters: facets => {
    const { SpecificationFilters = {} } = facets
    return objToNameValue('name', 'value', SpecificationFilters)
  },
}

export const resolveLocalProductFields = product => {
  const resolveFields = juxt([resolvers.items])
  const [items] = resolveFields(product)
  return { ...product, items }
}

export const resolveProductFields = async (
  ioContext: IOContext,
  product: any
) => {
  const resolvedProduct = resolveLocalProductFields(product)

  return { ...resolvedProduct }
}
