import axios from 'axios'
import {
  compose,
  concat,
  filter,
  find,
  flip,
  invertObj,
  isNil,
  keys,
  map,
  pluck,
  prop,
  reduce,
  reject,
} from 'ramda'
import { notFound } from './notFound'

const FIELD_TO_FILE = {
  fullDescription: 'full_description.txt',
  installationSteps: 'installation_steps.txt',
  shortDescription: 'short_description.txt',
  terms: 'terms.md',
}

const FILE_TO_FIELD = invertObj(FIELD_TO_FILE)

const getFilesToFetch = compose(
  reject(isNil),
  map(flip(prop)(FIELD_TO_FILE)),
  keys
)

const splitLocale = locale => locale.split('-')[0]

export const getExtraResources = async (
  fetcher,
  name,
  version,
  fields,
  cookie = '',
  ioContext,
  policies,
) => {
  const extra: { screenshots?: any; permissions?: any } = {}
  const locales = ['en-US', 'pt-BR', 'es-AR']
  const files: string[] = getFilesToFetch(fields)
  
  if (files.length > 0) {
    await Promise.all(reduce(concat, [], 
      files.map(filename => {
        extra[FILE_TO_FIELD[filename]] = {}
  
        return map(locale => {
          const lang = splitLocale(locale)
  
          return fetcher
            .getAppFile(name, version, `public/metadata/${locale}/${filename}`)
            .then(({ data }) => extra[FILE_TO_FIELD[filename]][lang] = data.toString())
            .catch(notFound(() => extra[FILE_TO_FIELD[filename]][lang] = ''))
        }, locales)
     })
    ))      
  }
  
  if (fields.screenshots) {
    const list = await fetcher.listAppFiles(name, version, {
      prefix: '/public',
    })
  
    extra.screenshots = {}

    locales.map(locale =>
      extra.screenshots[splitLocale(locale)] = compose(
        filter(path => path.startsWith(`public/metadata/${locale}/screenshots/`)),
        pluck('path'),
        prop('data')
      )(list)
    )
  }
  
  if (fields.permissions) {
    extra.permissions = []
  }
  
  return extra
}
