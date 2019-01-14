import React from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

export function Lines ({ lines } ) {
  return lines.map((cells, index) =>
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      key={index}
      date="2011 - present" 
      cells={cells}>
        <h3 className="vertical-timeline-element-title">Creative Director</h3>
        <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
        <p>
          Creative Direction, User Experience, Visual Design, Project Management, Team Leading
        </p>
    </VerticalTimelineElement>
  );
}

class Timeline extends React.Component {



  render() {
    return (
      <VerticalTimeline>
        <Lines lines={['A', 'B']}/>
    </VerticalTimeline>
    );
  }
}

export default Timeline;
