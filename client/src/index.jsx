import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }


  componentDidMount() {
    $.get({
      url: 'repos',
      success: (data) => {
        console.log('Return all the repos', data)
        this.setState({
          repos: data
        })
        // upon receipt of success, we update the state with the popular repos
      }
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    // submit and ajax POST method request to the server and then onto Github
    console.log(typeof term)

    $.post({
      url: 'repos',
      data: {user: term},
      success: (data) => {
        console.log('Send back should be a big: ', data)
        // upon receipt of success, we should automatically rerender without req'ing refresh
      }
    });

  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));