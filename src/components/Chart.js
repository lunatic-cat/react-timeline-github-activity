import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
  Title,
  Tooltip,
  Legend
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { EventTracker } from '@devexpress/dx-react-chart';

export function Charts({data, classes}) {
  return (
    <Chart
      data={data}
      className={classes.chartBlock}
      width='500'
    >
      <PieSeries
        className={classes.chart}
        valueField="area"
        argumentField="event"
      />
      <Title
        text={data[0].user}
      />
      <Animation />
      <Legend position='right' />
      <EventTracker />
      <Tooltip />
    </Chart>
  )
}

function ChartComponent(props) {
  const { classes, data } = props;
  console.log(data)
  return (
    <div className={classes.charts}>
      <Paper className={classes.chartsBody}>
        { data.map((item, index) => {
            return <Charts key={index} classes={classes} data={item} />;
          })
        }
      </Paper>
    </div>
  );
};

export default withStyles(styles)(ChartComponent);