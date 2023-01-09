const mongoose = require('mongoose');

const { Schema } = mongoose;
const postSchema = new Schema({
  user_name: {type: String, ref: 'User'},
  like: {type: Number},
  problem_name: {type: String, ref: "Problem"},
  title: {type: String},
  hash_title: [{type:String ,default:null,ref: "Hashtag"}],
  content: {type: String},
  created_at :{type: Date,default: Date.now}
})
module.exports = mongoose.model('Post', postSchema);