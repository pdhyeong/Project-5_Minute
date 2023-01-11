const express = require("express");
const router = express.Router();
const cron = require("node-cron");
const pm2 = require('pm2');
require('dotenv').config();
//const models = require("./models");
const connect = require("./schemas/connection");
connect();
const User = require('./schemas/users');
const nftSchema = require('./schemas/nft');
// web3연결

const Web3 = require("web3");
const rpcURL = process.env.INFURAURL;

const web3 = new Web3(rpcURL);
const Contract = web3.eth.Contract;
const abi = require('./erc20_abi');
console.log(abi);
const findevent = async (user_name) => {
	 try {
		const contractAddr = process.env.ERC20_CA;
		const userinfo = await User.find({nickname : user_name});
		let useraddress = userinfo[0].address;
		console.log(useraddress);
    	const contract = new Contract(abi.erc20_abi,contractAddr);
		let options = {
			    fromBlock: 0,
			    address: [contractAddr,useraddress],    //Only get events from specific addresses
			    topics: []                              //What topics to subscribe to
			};
    let subscription = web3.eth.subscribe('logs', options,(err,event) => {
        if (!err)
        console.log(event);
    });
	// erc20은 transfer이벤트를 확인해야한다.

	// 유저간의 잔고차이를 바인딩해줘야하고

	// 잔고가 바뀔때는 트랜잭션이 바뀔테니까 transfer가 발생하면 그 때 유저사이의 잔고를 조정해주기

	//erc1155 는 transfer를 감지해서 user한테 그 
	console.log(subscription);
    console.log("잘실행중");
    subscription.on('data', event => console.log(event))
    subscription.on('changed', changed => {
		// 
		if(changed){

		}
		else {

		}
	});
    subscription.on('connected', nr => console.log(nr));

	} catch (err) {
		console.log(err);
		return err;
	}
}
findevent("slstls218");
// 블록이나 트랜잭션으로부터 필요한 정보를 DB에 저장합니다.


// 매 초마다 실행 (실행주기를 설정할 수 있습니다.)
/*
const task = cron.schedule(
	"* * * * * *",
	async () => {
		// 주기적으로 실행하고자 하는 함수
		// 예시
		
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
*/