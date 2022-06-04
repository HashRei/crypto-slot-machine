const MORALIS_ID = process.env.MORALIS_ID

export enum ChainId {
    MAINNET = 43114, // Avalanche mainnet
    TESTNET = 43113 // Fuji testsnet
  }
  
  export const PROVIDER: { [chainId in ChainId]: string } = {
    [ChainId.MAINNET]: `https://speedy-nodes-nyc.moralis.io/${MORALIS_ID}/avalanche/mainnet`,
    [ChainId.TESTNET]: `https://speedy-nodes-nyc.moralis.io/${MORALIS_ID}/avalanche/testnet`
  }
  