const mongoose = require('mongoose');

const { Schema } = mongoose;
const HashtagSchema = new Schema({
  title: {type: String}
})
module.exports = mongoose.model('Hashtag', HashtagSchema);