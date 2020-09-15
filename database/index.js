const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  repoID: Number,
  fullName: String,
  stargazers: Number,
  forkCount: Number,
  username: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (err, results) => {
  if (err) {
    return console.log('ERROR: ', err);
  }
  return results;
}

module.exports.save = save;