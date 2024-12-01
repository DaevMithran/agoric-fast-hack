import { makeIssuerKit, AmountMath } from "@agoric/ertp"
import { Far } from "@agoric/marshal"

export const start = async (zcf) => {
  const { issuer, mint, brand } = makeIssuerKit("ExampleToken")

  const tokenFacet = Far("TokenFacet", {
    mintTokens: (amount) => {
      const payment = mint.mintPayment(amount)
      return payment
    },
  })

  const publicFacet = Far("PublicFacet", {
    getIssuer: () => issuer,
    getBrand: () => brand,
  })

  return { publicFacet, tokenFacet }
}
