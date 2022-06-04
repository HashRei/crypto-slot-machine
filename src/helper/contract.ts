import { NFTMarketplace__factory } from "../../typechain-types";
import { slotmachineAddress } from "../../utils/constants";
import { ethers } from "ethers";

const MORALIS_ID = process.env.MORALIS_ID

export const getContract = (library: { getSigner: (arg0: any) => { (): any; new(): any; connectUnchecked: { (): any; new(): any; }; }; }, account: any) => {
	let signer
	if(library == undefined){
		 signer = new ethers.providers.JsonRpcProvider(
			`https://speedy-nodes-nyc.moralis.io/${MORALIS_ID}/avalanche/testnet`
	  )}
	  else{
		 signer = library.getSigner(account).connectUnchecked();
	  }
	
	let contract = new ethers.Contract(slotmachineAddress, NFTMarketplace__factory.abi, signer);
	return contract;
};