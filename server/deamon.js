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

const asyncfunc = async () => {
	// 노드의 최신블록넘버 조회
	const getLatestBlock = await web3.eth.getBlockNumber();

	// 블록정보
	let blockn = await web3.eth.getBlock(getLatestBlock);

	// 트랜잭션정보

	 const txInfo = await web3.eth.getTransaction(blockn.transactions[0]);

	// 충환님이 보낸 컨트렉트 CA주소를 확인해보기

 	console.log(getLatestBlock,blockn,txInfo.from);
 	let check = nftSchema.find({tx_hash: blockn.transactions[0]});
}
asyncfunc();

// 블록이나 트랜잭션으로부터 필요한 정보를 DB에 저장합니다.

// 매 초마다 실행 (실행주기를 설정할 수 있습니다.)

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

task.start();