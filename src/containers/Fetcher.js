import * as React from 'react';
import { connect } from 'react-redux';
import { changeUsersData, changeActivityPerPage } from '../store/users/actions';
import Timeline from '../components/Timeline';
import Options from '../components/Options';
import fetch from 'cross-fetch';
import _ from 'lodash';
import { ClipLoader } from 'react-spinners';
import { className } from '../App';

const mapStateToProps = state => {
  return {
    usersData: state.response.users,
    composeUsersData: state.response.composeActivity,
    dataCountForUser: state.response.activityPerPage,
  };
};

export class Fetcher extends React.Component {

  componentDidMount() {
    this.fetchOrgUsers()
  };

  componentDidUpdate(prevProps){
    if (prevProps.dataCountForUser !== this.props.dataCountForUser ) {
      this.fetchOrgUsers();
    }
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
    const { dataCountForUser } = this.props;
    const query = `?per_page=${dataCountForUser}`
    fetch(url+query)
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
    const users = _.concat(this.props.usersData, [body]);
    this.props.dispatch(changeUsersData(users))
  };

  onChangeActivityCount(perPage){
    this.props.dispatch(changeUsersData([]));
    this.props.dispatch(changeActivityPerPage(perPage));
  }

  render() {
    const { usersData, composeUsersData, dataCountForUser } = this.props;
    const users = _.flatten(usersData);
    const response = composeUsersData 
      ? _.reverse(_.sortBy(users, [function(o) {return new Date(o.created_at)}]))
      : users
    const loading = response.length === 0;
    return (
      <Options perPage={dataCountForUser} onChange={perPage => this.onChangeActivityCount(perPage)}>
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
              : <Timeline response={response} />
          }
        </div>
      </Options>
    );
  }
};

export default connect(mapStateToProps)(Fetcher);
