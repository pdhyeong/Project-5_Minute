const express = require("express");
const router = express.Router();
const cron = require("node-cron");
const pm2 = require('pm2');
require('dotenv').config();
//const models = require("./models");
const User = require('./schemas/users');
const nftSchema = require('./schemas/nft');
// web3연결

const Web3 = require("web3");
const rpcURL = process.env.INFURAURL;

const web3 = new Web3(rpcURL);
const Contract = web3.eth.Contract;

const findevent = async (user_name) => {
	// 노드의 최신블록넘버 조회
	// const getLatestBlock = await web3.eth.getBlockNumber();

	// // 블록정보
	// let blockn = await web3.eth.getBlock(getLatestBlock);

	// // 트랜잭션정보

	//  const txInfo = await web3.eth.getTransaction(blockn.transactions[0]);

	// // 충환님이 보낸 컨트렉트 CA주소를 확인해보기

 	// console.log(getLatestBlock,blockn,txInfo.from);

	 const abi = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "burn",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transferFromDeployer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
	
	 const contractAddr = `${process.env.ERC20_CA}`;
	 const contract = new Contract(abi,contractAddr);
	 let userinfo = [User.find({nickname : `${user_name}`})];
	 console.log(userinfo);
	 let useraddress = userinfo[0].address;

	 let options = {
		 fromBlock: 0,
		 address: [`${process.env.ERC20_CA}`,`${useraddress}`],    //Only get events from specific addresses
		 topics: []                              //What topics to subscribe to
	 };
	 
	 let subscription = await web3.eth.subscribe('logs', options,(err,event) => {
		 if (!err)
		 console.log(event)
	 });

	 subscription.on('data', event => console.log(event))
	 subscription.on('changed', changed => console.log(changed))
	 subscription.on('connected', nr => console.log(nr))
}
// 블록이나 트랜잭션으로부터 필요한 정보를 DB에 저장합니다.


// 매 초마다 실행 (실행주기를 설정할 수 있습니다.)

const task = cron.schedule(
	"* * * * * *",
	async () => {
		// 주기적으로 실행하고자 하는 함수
		// 예시
		findevent('jihyo');
	},
	{
		scheduled: false,
	}
);

// router.get("/", async (req,res,next) => {
// 	let version = web3.version.api;
// 	let address = User.find({nickname : `${}`});
// 	$.getJSON('https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=0xfc724f3f942bbc63f14fe4dd4b9128c23c693909&apikey=YourApiKeyToken', function (data) {
// 		let contractABI = "";
// 		contractABI = JSON.parse(data.result);
// 		if (contractABI != ''){
// 			var MyContract = web3.eth.contract(contractABI);
// 			var myContractInstance = MyContract.at("0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359");
// 			var result = myContractInstance.memberId("0xfe8ad7dd2f564a877cc23feea6c0a9cc2e783715");
// 			console.log("result1 : " + result);            
// 			var result = myContractInstance.members(1);
// 			console.log("result2 : " + result);
// 		} else {
// 			console.log("Error" );
// 		}            
// });
task.start();