import * as React from 'react';
import { connect } from 'react-redux';
import { changeComposeUsers } from '../store/users/actions';
import Timeline from '../components/Timeline';
import _ from 'lodash';


const mapStateToProps = state => {
  return {
    grouppedUsersData: _.take(state.response.grouppedUsersData)[0],
    composeUsersData: state.response.composeActivity,
    dataCountForUser: state.response.activityPerPage,
    activeUser: state.response.activeUser
  };
};


export class TimelineContainer extends React.Component {
    getUserData(user, data) {
        if (!user) return _.values(data);
        return data[user];
    };

    
    render() {
        const { grouppedUsersData, composeUsersData, activeUser, dispatch } = this.props;
        const data = composeUsersData && !activeUser ? _.flatten(_.values(grouppedUsersData)) : this.getUserData(activeUser, grouppedUsersData)
        const sortedData = _.reverse(_.sortBy(data, [function(o) {return new Date(o.created_at)}]))

        return (
            <Timeline response={sortedData} activeUser={activeUser} changeComposeUsers={userName => dispatch(changeComposeUsers(userName))} />
        );
    }
};

export default connect(mapStateToProps)(TimelineContainer);
