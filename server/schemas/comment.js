const mongoose = require('mongoose');

const { Schema } = mongoose;
const commentSchema = new Schema({
  like: {type: Number},
  user_name: {type:String ,ref: 'User'},
  comment_content : {type: Number}
})
module.exports = mongoose.model('Comment', commentSchema);