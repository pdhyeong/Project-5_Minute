const mongoose = require('mongoose');

const { Schema } = mongoose;

const nftSchema = new Schema({
    nft_id : {type:Number},
    price : {type: Number},
    image : {type: String},
    owner_address: [{
      user_address : {type: String}
    }]
  })
  module.exports = mongoose.model('Nft', nftSchema);