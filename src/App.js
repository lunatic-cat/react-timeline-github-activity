import React, { Component } from 'react';
import './App.scss';
import 'react-vertical-timeline-component/style.min.css';
import Timeline from './components/Timeline'
import fetch from 'cross-fetch';
import _ from 'lodash';
import { ClipLoader } from 'react-spinners';
import block from 'bem-cn';

export const className = block('timeline');

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
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
    body.forEach(item => {
      this.fetchData(item.url+'/events');
    });
  };

  parseFetch(body) {
    const users = _.concat(this.state.users, [body]);
    this.setState({ users: users} )
  };

  render() {
    const { users } = this.state;
    const loading = users.length === 0;
    return (
      <div className = {className()}>
        {
          loading
            ? <div className = {className('loader')}>
                <ClipLoader
                  sizeUnit={"px"}
                  size={150}
                  loading={loading}
                />
              </div>
            : <Timeline users={users} />
        }
      </div>
    );
  };
};

export default App;
