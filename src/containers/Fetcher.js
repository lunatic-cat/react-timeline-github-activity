import * as React from 'react';
import { connect } from 'react-redux';
import { changeUsersData, changeUsersCount } from '../store/users/actions';
import { changeOrganization } from '../store/organization/actions';
import FetcherComponent from '../components/Fetcher';
import _ from 'lodash';

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
  render() {
    const { grouppedUsersData, usersCount, drawerOpen, dispatch } = this.props;
    const loading = !_.eq(_.size(_.take(grouppedUsersData)[0]), usersCount);

    return (
      <FetcherComponent
        {...this.props}
        loading={loading}
        changeUsersData={(data, login) => dispatch(changeUsersData(data, login))}
        changeUsersCount={count => dispatch(changeUsersCount(count))}
        changeOrganization={data => dispatch(changeOrganization(data))}
      />
    );
  }
};

export default connect(mapStateToProps)(Fetcher);
