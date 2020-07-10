const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  urlCode: {
    type: String,
  },
  longUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model('url', UrlSchema);
