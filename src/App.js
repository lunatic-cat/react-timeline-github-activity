import React, { Component } from 'react';
import './App.css';
import 'react-vertical-timeline-component/style.min.css';
import Timeline from './components/Timeline'
import fetch from 'cross-fetch';
import Loader from 'react-loader-spinner'
import LoadingOverlay from 'react-loading-overlay';
import _ from 'lodash';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      response: [],
      fetched: false,
      users: []
    }
  };

  componentDidMount() {
    this.fetchOrgUsers()
  };

  fetchOrgUsers() {
    fetch('https://api.github.com/orgs/lunatic-cat/members')
      .then(res => {
        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }
        return res.json();
      })
      .then(body => this.parseUsers( body ))
      .catch(err => {
        console.error(err);
      });
  };

  fetchData(url) {
    fetch(url)
    .then(res => {
      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }
      return res.json();
    })
    .then(user => {
      this.parseFetch(user)
    })
    .catch(err => {
      console.error(err);
    });
  };

  parseUsers(body) {
    body.map(item => {
      this.fetchData(item.url+'/events');
    })
    this.setState({ fetched: true} )
  };

  parseFetch(body) {
    const users = _.concat(this.state.users, [body]);
    this.setState({ users: users} )
  };

  render() {
    const { users, fetched } = this.state;
    return (
      <LoadingOverlay active={!fetched} spinner={<Loader type="Puff" color="#aaaaaa" height={80} width={80} />}>
        {<Timeline users={users} />}
      </LoadingOverlay>
    );
  };
};

export default App;
