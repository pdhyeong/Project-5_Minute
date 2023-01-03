const mongoose = require('mongoose');

const { Schema } = mongoose;

const nftSchema = new Schema({
    user_name: {type: String, ref:'User'},
    token_address: {type: String},
    tx_hash: {type: String}
  })
  module.exports = mongoose.model('Nft', nftSchema);