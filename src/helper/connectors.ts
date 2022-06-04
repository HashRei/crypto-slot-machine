import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const MORALIS_ID = process.env.MORALIS_ID

const RPC_URLS = {
	43114: `https://speedy-nodes-nyc.moralis.io/${MORALIS_ID}/avalanche/mainnet`,
	43113: `https://speedy-nodes-nyc.moralis.io/${MORALIS_ID}/avalanche/testnet`
};

//metamask
export const injected = new InjectedConnector({
	supportedChainIds: [ 43114, 43113]
});

// walletconnect
export const walletconnect = new WalletConnectConnector({
	rpc: {
		43114: RPC_URLS[43114],
		43113: RPC_URLS[43113]
	},
	qrcode: true,
});


export function resetWalletConnector(connector: { walletConnectProvider: undefined; }) {
	if (connector && connector instanceof WalletConnectConnector) {
		connector.walletConnectProvider = undefined;
	}
}