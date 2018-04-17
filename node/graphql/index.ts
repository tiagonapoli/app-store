import '../axiosConfig'
import appProduct from '../resolvers'

// tslint:disable-next-line:no-var-requires
Promise = require('bluebird')
Promise.config({ longStackTraces: true })

export const resolvers = {
  Query: {
    ...appProduct,
  },
}
