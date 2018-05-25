import axios from 'axios'
import { IOContext } from 'colossus'
import { juxt, map, takeLast, toPairs } from 'ramda'

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

  categories: facets => {
    const { categories = [] } = facets
    return takeLast(1, categories.length)
  },

  categoriesIds: facets => {
    const { categoriesIds = [] } = facets
    return takeLast(1, categoriesIds.length)
  }
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
