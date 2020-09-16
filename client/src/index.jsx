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
        this.setState({
          repos: data
        })
        // upon receipt of success, we update the state with the popular repos
      }
    });
  }

  search (term) {
    console.log(`${term} was searched`);

    $.post({
      url: 'repos',
      data: {user: term},
      success: (data) => {
        console.log('Send back should be a big: ', data)
        // upon receipt of success, we should automatically rerender without req'ing refresh
        this.setState({
          repos: data
        })
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));