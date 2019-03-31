import React from 'react';
import './index.scss';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import moment from 'moment';
import _ from 'lodash';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { className } from '../../App';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import SnackbarContent  from '@material-ui/core/SnackbarContent';  

const styles = theme => ({
  badge: {
    top: '30%',
    right: -40,
    // The border color match the background color.
    border: `1px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
});

export function pushEventLine(item) {
  return (
  <Grid item xs={12} sm={12}>
    <Divider light />
    <p>
      <Grid item xs={8} justify="flex-end" sm={8}>
        { item.sha }
      </Grid>
    </p>
    <Grid item xs={12} justify="flex-end" sm={12}>
      <p>
         <SnackbarContent message = { item.message }
         />
      </p>
    </Grid>
  </Grid>)
}

export function Lines({ lines, classes }) {
  return lines.map((line, index) =>
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      key={index}
      date={moment(line.created_at).format("dddd, MMMM Do YYYY")}
      icon={<img src={line.actor.avatar_url} alt="" className={ className('avatar') }></img>}
      line={line}>
       <Grid container spacing={40}>
        <Grid item xs={6} sm={3}>
          <Chip
            icon={<FaceIcon />}
            label={line.type}
            className={classes.chip}
            color="primary"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
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
        <Grid item xs={12} sm={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                <a href={`https://github.com/${line.repo.name}`}>{line.repo.name}</a>
              </Typography>
              <Typography variant="body1" gutterBottom component="body1">
                { 
                  _.eq(line.type, 'PushEvent')
                    ? line.payload.commits.map( item => pushEventLine(item) )
                    : null
                }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
     
    </VerticalTimelineElement>
  );
}

class Timeline extends React.Component {

  render() {
    const { response, classes  } = this.props;
    console.log(response)
    return (
      response.length > 0
        ? <VerticalTimeline>
            <Lines lines={response} classes ={classes } />
          </VerticalTimeline>
        : <p className = { className('is-empty') }>No data</p>
    );
  }
}

export default withStyles(styles)(Timeline);
