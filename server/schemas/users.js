const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  nickname: {type: String},
  password: {type: String},
  email: {type: String},
  address: {type: String},
  token_amount: {type: Number},
  eth_amount: {type: Number},
  created_at: {type: Date,default: Date.now},
  problem_id: [{type: String,ref:'Problem'}]
})
module.exports = mongoose.model('User', userSchema);