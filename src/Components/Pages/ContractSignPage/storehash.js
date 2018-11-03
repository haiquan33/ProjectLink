import web3 from './web3';
//access our local copy to contract deployed on rinkeby testnet
//use your own contract address
const address = '0x51f5d8a124838473c3464b3f5b3ea2b4c856e4f3';
//use the ABI from your contract
const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "x",
				"type": "string"
			}
		],
		"name": "sendHash",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getHash",
		"outputs": [
			{
				"name": "x",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
const storehash= web3.eth.contract(abi).at(address);
export {storehash} ;
