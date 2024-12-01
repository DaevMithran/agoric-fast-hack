import { E } from "@agoric/eventual-send"
import { makeZoe } from "@agoric/zoe"

const deploy = async (homeP) => {
  const zoe = await E(homeP).makeZoe()
  const bundle = await bundleSource("./path/to/contract.js")
  const installation = await E(zoe).install(bundle)

  // Deploy the contract
  const { publicFacet, creatorFacet } = await E(zoe).startInstance(installation)

  console.log("Contract deployed successfully")
  console.log("Public Facet:", publicFacet)
  console.log("Creator Facet:", creatorFacet)
}

export default deploy
