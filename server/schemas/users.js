const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  nickname: {type: String},
  profile_image: {type: String},
  password: {type: String},
  email: {type: String},
  address: {type: String},
  bookmark: [{type: String}],
  token_amount: {type: Number},
  eth_amount: {type: Number},
  created_at: {type: Date,default: Date.now},
  problem_name: [{type: String,ref:'Problem'}],
  google_id: {type: String}
})
module.exports = mongoose.model('User', userSchema);