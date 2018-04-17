export const paths = {
  crossSelling: (account, id, type) =>
    `http://${account}.vtexcommercestable.com.br/api/catalog_system/pub/products/crossselling/${type}/${id}`,
  product: (account, { slug }) =>
    `http://${account}.vtexcommercestable.com.br/api/catalog_system/pub/products/search/${slug}/p`,
}
