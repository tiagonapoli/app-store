import { Registry } from '@vtex/api'
import graphqlFields from 'graphql-fields'
import { apply, compose, last, prop, props } from 'ramda'
import { getExtraResources } from './utils/extraResources'
import { locator } from './utils/locator'

const getLastLocator = compose(
  locator,
  prop('versionIdentifier'),
  last,
  prop('data')
)

export default function appRegistry(ioContext) {
  const client = new Registry(ioContext)

  const getVersionsByApp: (appData: any) => Promise<any> = compose(
    client.listVersionsByApp,
    prop('partialIdentifier')
  )

  const getAppManifest: (appData: any) => Promise<any> = compose(
    apply(client.getAppManifest),
    props(['name', 'version'])
  )

  return {
    getAppFile(name: string, version: string, path: string): Promise<any> {
      return client.getAppFile(name, version, path)
    },

    getLatestVersion(name: string): Promise<any> {
      return client
        .listVersionsByApp(name)
        .then(getLastLocator)
        .then(prop('version'))
    },

    getAppManifest(name: string, version: string): Promise<any> {
      return client.getAppManifest(name, version)
    },

    listAppFiles(
      name: string,
      version: string,
      opts?: { prefix: string }
    ): Promise<any> {
      return client.listAppFiles(name, version, opts)
    },
  }
}
