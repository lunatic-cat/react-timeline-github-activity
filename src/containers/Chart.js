import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChartComponent from '../components/Chart';
import _ from 'lodash';

const mapStateToProps = state => {
  const resp = _.take(state.response.grouppedUsersData)[0]
  const activeUser = state.response.activeUser;
  
  return {
    data: takeData(activeUser, resp)
  }
};

const takeData = (activeUser, resp) => {
  let currentData;
  if (!activeUser) {
    const responseData = _.filter(resp, function(o) { return !_.isEmpty(o) });
    currentData = _.take(_.reverse(_.sortBy(responseData, [function(o) { return o.length; }])), 3)
  }
  else
    currentData = _.take([resp[activeUser]]);

  const groupedData = currentData.map(item => {
    return _.groupBy(item, w => w.type)
  });

  return groupedData.map((item) => {
    return _.compact(_.map(item, (a, e) => {
      if (e === 'PullRequestReviewCommentEvent') return;
      return { event: e, area: a.length, user: a[0].actor.login } 
    }))
  });
}

export class DrawerContainer extends Component {
  render() {
    const { data } = this.props;
    return (
      <ChartComponent
        data={data}
      />
    )
  }
};

export default connect(mapStateToProps)(DrawerContainer);
