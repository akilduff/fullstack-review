import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} popular repos!
    {props.repos.map((repo) => {
    return <p><a href={`https://github.com/${repo.fullName}`}> {repo.fullName} with {repo.forkCount} forks!</a></p>
    })}
  </div>
)

export default RepoList;