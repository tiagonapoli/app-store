import axios from 'axios'
import {
  compose,
  filter,
  find,
  flip,
  invertObj,
  isNil,
  keys,
  map,
  pluck,
  prop,
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

export const getExtraResources = async (
  fetcher,
  name,
  version,
  fields,
  cookie = '',
  ioContext,
  policies,
  locale
) => {
  const extra: { screenshots?: any; permissions?: any } = {}
  const files: string[] = getFilesToFetch(fields)
  if (files.length > 0) {
    await Promise.map(files, filename =>
      fetcher
        .getAppFile(name, version, `public/metadata/${locale}/${filename}`)
        .then(({ data }) => (extra[FILE_TO_FIELD[filename]] = data.toString()))
        .catch(notFound(''))
    )
  }
  if (fields.screenshots) {
    const list = await fetcher.listAppFiles(name, version, {
      prefix: '/public',
    })
    const screenshotsFolder = `public/metadata/${locale}/screenshots/`
    extra.screenshots = compose(
      filter(path => path.startsWith(screenshotsFolder)),
      pluck('path'),
      prop('data')
    )(list)
  }
  if (fields.permissions) {
    extra.permissions = []
  }

  return extra
}
