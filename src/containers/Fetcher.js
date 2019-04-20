import * as React from 'react';
import { connect } from 'react-redux';
import { changeUsersData, changeUsersCount } from '../store/users/actions';
import Timeline from './Timeline';
import fetch from 'cross-fetch';
import _ from 'lodash';
import { ClipLoader } from 'react-spinners';
import { className } from '../App';

const mapStateToProps = state => {
  return {
    grouppedUsersData: state.response.grouppedUsersData,
    dataCountForUser: state.response.activityPerPage,
    usersCount: state.response.usersCount
  };
};

export class Fetcher extends React.Component {

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

  fetchData(url, login) {
    const { dataCountForUser } = this.props;
    const query = `?per_page=${dataCountForUser}`
    fetch(url+query)
    .then(res => {
      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }
      return res.json();
    })
    .then(data => {
      this.props.dispatch(changeUsersData(data, login))
    })
    .catch(err => {
      console.error(err);
    });
  };

  parseUsers(body) {
    this.props.dispatch(changeUsersCount(body.length))
    body.forEach(item => {
      this.fetchData(item.url+'/events', item.login);
    });
  };

  render() {
    const { grouppedUsersData, usersCount } = this.props;
    const loading = !_.eq(_.size(_.take(grouppedUsersData)[0]), usersCount);

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
              : <Timeline />
          }
        </div>
    );
  }
};

export default connect(mapStateToProps)(Fetcher);
