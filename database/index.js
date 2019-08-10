const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/stanza', {useNewUrlParser: true});

const songSchema = new mongoose.Schema({
  author: 'string',
  title: 'string',
  text: 'string'
});

const Song = mongoose.model('Song', songSchema);

const insert = (song) => {
  return Song.create(song);
}

const retrieve = (author) => {
  return Song.find({author: author});
}

module.exports = {
  insert: insert,
  retrieve: retrieve
}
