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

let addRepos = (reposData) => {

  reposData.map((repoData) => {
    // the question is how do I insert into the Repo table
    // repo.insert is not a function....
    console.log('Repo Table: ', Repo)
    console.log('Repo ID: ', repoData.id)
    Repo.insert(
      [
        {repoID: repoData.id},
        {fullName: repoData.full_name},
        {stargazers: repoData.stargazer_count},
        {forkCount: repoData.forks_count},
        {username: repoData.owner.login}
      ]
    );
  });

  console.log('Check DB now')
}

let returnRepos = () => {
  console.log('DB RESULTS')
  // returning the below item is a big long thing
  Repo.find({forkCount: {$gte: 1}})
}

module.exports.save = save;
module.exports.addRepos = addRepos;
module.exports.returnRepos = returnRepos;