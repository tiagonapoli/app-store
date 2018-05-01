import axios, { AxiosResponse } from 'axios'
import { ColossusContext } from 'colossus'
import graphqlFields from 'graphql-fields'
import { compose, equals, find, head, map, prop } from 'ramda'
import appRegistry from './apps/appRegistry'
import { getExtraResources } from './apps/utils/extraResources'
import { matchAppId, removeBuild } from './apps/utils/locator'
import { resolveProductFields } from './catalog/fieldsResolver'
import { withAuthToken } from './catalog/header'
import { paths } from './catalog/paths'

export default {
  appProduct: async (
    _,
    data,
    {
      vtex: ioContext,
      request: {
        headers: { cookie },
      },
    }: ColossusContext,
    info
  ) => {
    const url = paths.product(ioContext.account, data)
    const { data: product } = await axios.get(url, {
      headers: withAuthToken()(ioContext),
    })
    const resolvedProduct = await resolveProductFields(ioContext, head(product))
    const linkText = resolvedProduct.linkText
    const id = resolvedProduct.items[0].referenceId[0].Value

    const match = matchAppId(id)
    if (!match) {
      throw new Error(
        'Invalid app id. Ids should be of the form: <registry>:<vendor>.<name>'
      )
    }
    const { account } = ioContext
    const [, , slug, , idVersion] = match
    const registry = appRegistry({ ...ioContext, account })
    const version = removeBuild(
      idVersion || (await registry.getLatestVersion(slug))
    )

    const {
      vendor,
      categories,
      title,
      policies,
      billingOptions,
    } = await registry.getAppManifest(slug, version)

    const fields = graphqlFields(info)
    const resources = await getExtraResources(
      registry,
      slug,
      version,
      fields,
      cookie,
      ioContext,
      policies
    )
    return {
      billing: billingOptions,
      categories,
      fields,
      icon: 'public/metadata/icon.png',
      id,
      linkText,
      name: title,
      vendor,
      version,
      ...resources,
      registry: account,
      slug,
    }
  }
}
