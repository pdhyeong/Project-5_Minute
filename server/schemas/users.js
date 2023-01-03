const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  nickname: {
    type: String,     // 자료형
    required: true,   // 필수 여부
    default: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true
  },
  token_amount: {
    type: Number,
    required: true
  },
  eth_amount: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  problem_id: {
    type: Number,
    required: true
  }
})
module.exports = mongoose.model('User', userSchema);