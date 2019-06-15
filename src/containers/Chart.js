import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChartComponent from '../components/Chart';
import _ from 'lodash';

const mapStateToProps = state => {
  const responseData = _.take(state.response.grouppedUsersData)[0];
  const topUsers = _.take(_.reverse(_.sortBy(responseData, [function(o) { return o.length; }])), 3)
  const groupedData = topUsers.map(item => {
    return _.groupBy(item, w => w.type)
  });
  const data = groupedData.map((item) => {
    return _.compact(_.map(item, (a, e) => {
      if (e === 'PullRequestReviewCommentEvent') return;
      return { event: e, area: a.length, user: a[0].actor.login } 
    }))
  });

  return {
    data
  };
};

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
