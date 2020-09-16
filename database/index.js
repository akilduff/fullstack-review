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

let saveCreate = (reposData, callback) => {

  reposData.map((repoData) => {
    var newRepoDetails = {
      repoID: repoData.id,
      fullName: repoData.full_name,
      stargazers: repoData.stargazers_count,
      forkCount: repoData.forks_count,
      username: repoData.owner.login
    }

    if (repoData.full_name === '') {
      console.log('Repo with empty name')
    } else {
      checkRepos(repoData.full_name, (err, result) => {
        if (err || JSON.stringify(result) !== JSON.stringify([])) {
          console.log('Duplicate exists, do not save')
        } else {
          var repoTitle = new Repo(newRepoDetails);
          repoTitle.save(function (err) {
            if (err) {
              console.log('ERROR in mongoose save process')
              callback(err, null)
            } else {
              callback(null, newRepoDetails)
            }
          });
        }
      });
    }
  });
}

let returnRepos = (callback) => {

  var getAll = Repo.find({}, (err, result) => {
    if (err) {
      console.log('Err with query')
      callback(err, null)
    } else {
      callback(null, result)
    }
  });
}

let checkRepos = (repoName, callback) => {
  var getAll = Repo.find({fullName: repoName}, (err, result) => {
    if (err) {
      console.log('Err with query')
      return callback(err, null)
    } else {
      return callback(null, result)
    }
  });
}

module.exports.saveCreate = saveCreate;
module.exports.returnRepos = returnRepos;