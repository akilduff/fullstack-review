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

let save = (table) => {
  Repo.create(table, (err, results) => {
    if (err) {
    return console.log('ERROR: ', err);
    }
    console.log(results);
  })
}

module.exports.save = save;