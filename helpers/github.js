const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (handle, callback)=> {

  let options = {
    url: `https://api.github.com/users/${handle}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  //curently implementing a not quite perfect use of axios and getting some callback errs
  axios.get(options.url)
    .then((response) => {
      reposByUser = response.data;
      return callback(null, reposByUser);
    })
    .catch(function(error) {
      console.log('ERROR in AXIOS')
      return callback(err, null);
    })

  return
}

module.exports.getReposByUsername = getReposByUsername;