const nano = require('nano')('http://localhost:5984');

let songs;

nano.db.get('songs')
  .catch(err => nano.db.create('songs'))
  .then(() => songs = nano.db.use('songs'))
  .then(() => songs.list())
  .then(results => console.log(results))

const insert = (song) => {
  return songs.insert(song, null);
};

module.exports = {
  insert: insert
};







