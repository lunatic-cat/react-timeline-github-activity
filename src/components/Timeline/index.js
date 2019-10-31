import React from 'react';
import './index.scss';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import moment from 'moment';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { className } from '../../App';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import _ from 'lodash';
import PushEvent from './PushEvent';

const styles = theme => ({
  root: {
    flexGrow: 1,
    boxSizing: 'initial'
  },
  badge: {
    top: '30%',
    border: `1px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
});

function getEventByType(type, line) {
  switch(type) {
    case 'PushEvent':
      return line.payload.commits.map( (item, key) => <div className={ className('commits') } key={key}><PushEvent item={item} /></div> )
    default:
      break;
  }
}

export function Lines({ lines, classes, onChangeUser }) {
  return lines.map((line, index) =>
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      key={index}
      date={moment(line.created_at).format("dddd, MMMM Do YYYY")}
      icon={<img src={line.actor.avatar_url} alt="" className={ className('avatar') } onClick={e => onChangeUser(line.actor.display_login)}></img>}
      line={line}>
       <Grid container spacing={16}>
       <Grid item xs={3} sm={3}>
          <Chip
            clickable
            href={`https://github.com/${line.actor.display_login}`}
            label={line.actor.display_login}
            component="a"
            className={classes.chip}
            color="secondary"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3} sm={3}>
          <Chip
            icon={<FaceIcon />}
            label={line.type}
            className={classes.chip}
            color="primary"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          { line.repo.map( (repo, index) => 
            <Card key = {index}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  <a href={`https://github.com/${repo.name}`}>{repo.name}</a>
                </Typography>
                    { getEventByType(line.type, line) }
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
     
    </VerticalTimelineElement>
  );
}

class Timeline extends React.Component {

  handleChange = (event, value) => {
    if (_.eq(value, 0)) this.props.changeComposeUsers(null);
  };

  valueByUser(user) {
    return !user ? 0 : 1;
  };

  render() {
    const { response, classes, changeComposeUsers, activeUser, organization } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="relative" color="secondary">
          <Tabs value={this.valueByUser(activeUser)} onChange={this.handleChange}>
            <Tab label={organization} />
            { activeUser ? <Tab label={activeUser} /> : null }
          </Tabs>
        </AppBar>
        <VerticalTimeline>
          <Lines lines={response} classes ={classes} onChangeUser={changeComposeUsers}/>
        </VerticalTimeline>
      </div>
    );
  }
}

export default withStyles(styles)(Timeline);
