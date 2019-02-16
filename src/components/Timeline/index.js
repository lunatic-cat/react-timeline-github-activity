import React from 'react';
import './index.css';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import moment from 'moment';
import _ from 'lodash';

export function Lines({ lines }) {
  return lines.map((line, index) =>
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      key={index}
      date={moment(line.created_at).format("dddd, MMMM Do YYYY")}
      icon={<img src={line.actor.avatar_url} alt="" className='avatar'></img>}
      line={line}>
      <h3 className="vertical-timeline-element-title">{line.actor.display_login}</h3>
      <h4 className="vertical-timeline-element-subtitle">{line.type}</h4>
      <p><a href={line.repo.url}>{line.repo.name}</a></p>
    </VerticalTimelineElement>
  );
}

class Timeline extends React.Component {

  render() {
    const { users } = this.props;
    const response = _.reverse(_.sortBy(_.flatten(users), [function(o) {return new Date(o.created_at)}]));

    return (
      response.length > 0
        ? <VerticalTimeline>
          <Lines lines={response} />
        </VerticalTimeline>
        : <p>No data</p>
    );
  }
}

export default Timeline;
