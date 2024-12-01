export const fileStructure = [
  {
    name: "contracts",
    type: "folder" as const,
    children: [
      {
        name: "SimpleStorage.js",
        type: "file" as const,
        content: `// SimpleStorage.js
  import { Far } from '@agoric/marshal';
  
  /**
  * @param {*} _initialValue
  */
  export const start = async (_initialValue) => {
    let value = _initialValue;
    
    const simpleStorage = Far('SimpleStorage', {
      getValue: () => value,
      setValue: (newValue) => {
        value = newValue;
      },
    });
  
    return simpleStorage;
  };`,
      },
      {
        name: "Token.js",
        type: "file" as const,
        content: `// Token.js
  import { makeIssuerKit, AmountMath } from '@agoric/ertp';
  import { Far } from '@agoric/marshal';
  
  export const start = async (zcf) => {
    const { issuer, mint, brand } = makeIssuerKit('ExampleToken');
  
    const tokenFacet = Far('TokenFacet', {
      mintTokens: (amount) => {
        const payment = mint.mintPayment(amount);
        return payment;
      },
    });
  
    const publicFacet = Far('PublicFacet', {
      getIssuer: () => issuer,
      getBrand: () => brand,
    });
  
    return { publicFacet, tokenFacet };
  };`,
      },
    ],
  },
  {
    name: "scripts",
    type: "folder" as const,
    children: [
      {
        name: "deploy.js",
        type: "file" as const,
        content: `// deploy.js
  import { E } from '@agoric/eventual-send';
  import { makeZoe } from '@agoric/zoe';
  
  const deploy = async (homeP) => {
    const zoe = await E(homeP).makeZoe();
    const bundle = await bundleSource('./path/to/contract.js');
    const installation = await E(zoe).install(bundle);
  
    // Deploy the contract
    const { publicFacet, creatorFacet } = await E(zoe).startInstance(installation);
  
    console.log('Contract deployed successfully');
    console.log('Public Facet:', publicFacet);
    console.log('Creator Facet:', creatorFacet);
  };
  
  export default deploy;`,
      },
    ],
  },
  {
    name: "README.md",
    type: "file" as const,
    content: `# Agoric Project
  
  This is an example Agoric project. It includes:
  
  - SimpleStorage contract
  - Token contract
  - Deployment script
  
  ## Getting Started
  
  1. Install dependencies: \`agoric install\`
  2. Start the local chain: \`agoric start local-chain\`
  3. Deploy the contracts: \`agoric deploy scripts/deploy.js\`
  
  For more information, visit [Agoric Documentation](https://docs.agoric.com).`,
  },
]
