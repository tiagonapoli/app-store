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
  // takes last category value, the catalog returns a list of category strings
  // the last element of the list represents the product's actual category
  // the other list elements represent the product's super categories.
  categories: product => {
    const { categories = [] } = product
    return takeLast(1, categories)
  },
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
  const resolveFields = juxt([resolvers.items, resolvers.categories])
  const [items, categories] = resolveFields(product)
  return { ...product, items, categories }
}

export const resolveProductFields = async (
  ioContext: IOContext,
  product: any
) => {
  const resolvedProduct = resolveLocalProductFields(product)

  return { ...resolvedProduct }
}
