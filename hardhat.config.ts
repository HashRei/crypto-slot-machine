import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-ethers"
import "hardhat-gas-reporter"
import "dotenv/config"
import "solidity-coverage"
import { HardhatUserConfig } from "hardhat/config"


const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
  },
  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
}

export default config
