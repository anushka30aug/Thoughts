const mongoose = require('mongoose')
const { Schema } = mongoose;
const noteSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  tag: {
    type: String,
    // required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: ''
  },

  description: {
    type: String,

  },

  date: {
    type: Date,
    default: Date.now
  }

});
module.exports = mongoose.model('Note', noteSchema);

