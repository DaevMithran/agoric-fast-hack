import { makeDurableStore } from "@agoric/vat-data"

// Contract to store and retrieve a value
const makeStorage = () => {
  const store = makeDurableStore() // Persistent storage

  return {
    storeValue: (value) => {
      // Validate input
      if (typeof value !== "number") {
        throw new Error("Value must be a number")
      }
      store.set("number", value)
    },
    retrieveValue: () => {
      return store.has("number") ? store.get("number") : 0
    },
  }
}

/** @type {import('@agoric/zoe/src/contractSupport/typing').ContractStartFn} */
const start = (zcf) => {
  const storage = makeStorage()

  const publicFacet = {
    store: (value) => {
      storage.storeValue(value)
    },
    retrieve: () => {
      return storage.retrieveValue()
    },
  }

  return harden({ publicFacet })
}

harden(start)
export { start }
