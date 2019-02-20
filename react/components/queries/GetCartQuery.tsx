import { Query } from 'react-apollo'

export class GetCartQuery extends Query<GetCartData>{ }

interface GetCartData {
  cart: {
    profile: {
      account: {
        name: string
        companyName: string
        fantasyName: string
        cnpj: string
      }
      user: {
        name: string
        email: string
      }
      items: {
        productName: string
        sellers: {
          sellerId: string
          sellerName: string
        }
      }
    }
  }
}