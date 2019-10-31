import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import Paper from '@material-ui/core/Paper';
import { PieChart, Pie, Sector } from 'recharts';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.user}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${payload.event}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Value: ${value}, Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

class ChartComponent extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/hqnrgxpj/';

  state = {
    indexes: {},
  };

  onPieEnter = (e, index) => {
    this.setState(state => Object.assign({}, state, { indexes: Object.assign({}, state.indexes, { [index]: e.name }) }));
  };

  render() {
    const { classes, data } = this.props;

    return (
      <div className={classes.charts}>
      <Paper className={classes.chartsBody}>
        { data.map((item, index) => {
            return (
              <PieChart key={index} width={800} height={400}>
                <Pie
                  activeIndex={this.state.indexes[index] || 0}
                  activeShape={renderActiveShape}
                  data={item}
                  innerRadius={120}
                  outerRadius={140}
                  fill="#8884d8"
                  dataKey="area"
                  onMouseEnter={e => this.onPieEnter(e, index)}
                />
              </PieChart>
            )
          })
        }
      </Paper>
    </div>
    );
  }
}

export default withStyles(styles)(ChartComponent);