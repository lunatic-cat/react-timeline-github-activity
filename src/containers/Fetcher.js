import * as React from 'react';
import { connect } from 'react-redux';
import { changeUsersData, changeUsersCount } from '../store/users/actions';
import { changeOrganization } from '../store/organization/actions';
import { toggleSidebarMenu } from '../store/sidebarMenu/actions';
import MainLayout from '../components/MainLayout';
import fetch from 'cross-fetch';
import _ from 'lodash';
import { ClipLoader } from 'react-spinners';
import { className } from '../App';

const mapStateToProps = state => {
  return {
    organization: state.organization,
    grouppedUsersData: state.response.grouppedUsersData,
    dataCountForUser: state.response.activityPerPage,
    usersCount: state.response.usersCount,
    drawerOpen: state.sidebarMenu.open
  };
};

export class Fetcher extends React.Component {

  componentDidMount() {
    this.fetchOrgUsers()
  };

  fetchOrgUsers() {
    fetch(`https://api.github.com/orgs/${this.props.organization}/members`)
      .then(res => {
        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }
        return res.json();
      })
      .then(body => this.parseUsers(body))
      .catch(err => {
        this.props.dispatch(changeOrganization(null))
      });
  };

  fetchData(url, login) {
    const { dataCountForUser } = this.props;
    const query = `?per_page=${dataCountForUser}`
    fetch(url + query)
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
      this.fetchData(item.url + '/events', item.login);
    });
  };

  render() {
    const { grouppedUsersData, usersCount, drawerOpen, dispatch } = this.props;
    const loading = !_.eq(_.size(_.take(grouppedUsersData)[0]), usersCount);

    return (
      <div className={className()}>
        {
          loading
            ? <div className={className('loader')}>
              <ClipLoader
                sizeUnit={"px"}
                size={150}
                loading={loading}
              />
            </div>
            : <MainLayout drawerOpen={drawerOpen} toggleSidebarMenu={toggle => dispatch(toggleSidebarMenu())} />
        }
      </div>
    );
  }
};

export default connect(mapStateToProps)(Fetcher);
