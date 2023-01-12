require('dotenv').config();
//const models = require("./models");

// db 연결
const connect = require("./schemas/connection");
connect();

// abi 가져오기
const erc20abi = require('./erc20_abi');
const erc1155abi = require('./erc1155_abi');

const User = require('./schemas/users');
const nftSchema = require('./schemas/nft');
// web3연결

const Web3 = require("web3");
const rpcURL = process.env.WSS;

const web3 = new Web3(rpcURL);
const Contract = web3.eth.Contract;


const findevent = async () => {
	 try {
		const contractAddr = process.env.ERC20_CA;

    	 const contract = new Contract(erc20abi.erc20_abi,contractAddr);
		let options = {
			filter: {
				value: [],
			},
			fromBlock: await web3.eth.getBlockNumber()
		};
		console.log(contract.events);
		contract.events.Transfer(options)
			.on('data', async event => {
				try{
					if(event){
						let vaule_length = String(event.returnValues.value).length;
						let Stringtoken = String(event.returnValues.value).slice(0,Number(vaule_length-18));
						let tokenamount = Number(Stringtoken);

						// 블록이나 트랜잭션으로부터 필요한 정보를 DB에 저장합니다.
						await User.updateOne({"address": event.returnValues.to},{ $inc : {"token_amount": tokenamount }}); 
						await User.updateOne({"address": event.returnValues.from},{ $inc : {"token_amount": -1 * tokenamount }}); 
					}
					else {
						return;
					}
				} catch (err) {
					console.err(err);
					return err;
				}
			})
			.on('changed', changed => console.log(changed))
			.on('error', err => console.log(err))
			.on('connected', str => console.log(str));
	} catch (err) {
		console.log(err);
		return err;
	}
}

const findNFTevent = async () => {
	try {
		const contractAddr = process.env.ERC1155_CA;

    	 const contract = new Contract(erc1155abi.erc1155_abi,contractAddr);
		 console.log(contract);
		let options = {
			filter: {
				value: [],
			},
			fromBlock: await web3.eth.getBlockNumber()
		};
		
		contract.events.TransferBatch(options)
			.on('data', async event => {
				try{
					if(event){
						console.log(event);
					}
					else {
						return;
					}
				} catch (err) {
					console.err(err);
					return err;
				}
			})
			.on('changed', changed => console.log(changed))
			.on('error', err => console.log(err))
			.on('connected', str => console.log(str));
	} catch (err) {
		console.log(err);
		return err;
	}
}
findNFTevent();
