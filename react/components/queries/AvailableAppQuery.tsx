import { BillingOptions } from '@vtex/api'
import { Query } from 'react-apollo'

export class AvailableAppQuery extends Query<AvailableAppData, AvailableAppVariables>{ }

interface AvailableAppData {
  availableApp: {
    id: string
    name: string
    slug: string
    vendor: string
    version: string
    icon: string
    title: string
    categories: string[]
    fullDescription: {
      en: string
      pt: string
      es: string
    }
    screenshots: {
      en: string[]
      pt: string[]
      es: string[]
    }
    registry: string
    policies: Array<{
      name: string
      attrs: {
        host: string
        path: string
      }
    }>
    billingOptions: BillingOptions
  }
}

interface AvailableAppVariables {
  id: string
  skip: boolean
}
