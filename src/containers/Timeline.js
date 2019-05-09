import * as React from 'react';
import { connect } from 'react-redux';
import { changeComposeUsers } from '../store/users/actions';
import Timeline from '../components/Timeline';
import _ from 'lodash';
import moment from 'moment';

const mapStateToProps = state => {
  const responseData = _.take(state.response.grouppedUsersData)[0];
  const startDate = state.sidebarMenu.startDate;
  return {
    grouppedUsersData: responseData,
    composeUsersData: state.response.composeActivity,
    dataCountForUser: state.response.activityPerPage,
    activeUser: state.response.activeUser,
    startDate: startDate
  };
};


export class TimelineContainer extends React.Component {
  getUserData(user, data) {
    if (!user) return _.values(data);
    return data[user];
  };

  filterByDate(data) {
    const startDate = this.props.startDate;

    return data.filter(item => { return moment(item.created_at) > moment(startDate) })
  }

  render() {
    const { grouppedUsersData, composeUsersData, activeUser, dispatch } = this.props;
    const data = composeUsersData && !activeUser ? _.flatten(_.values(grouppedUsersData)) : this.getUserData(activeUser, grouppedUsersData);
    const filteredData = this.filterByDate(data);
    const sortedData = _.reverse(_.sortBy(filteredData, [function (o) { return new Date(o.created_at) }]))

    return (
      <Timeline response={sortedData} activeUser={activeUser} changeComposeUsers={userName => dispatch(changeComposeUsers(userName))} />
    );
  }
};

export default connect(mapStateToProps)(TimelineContainer);
