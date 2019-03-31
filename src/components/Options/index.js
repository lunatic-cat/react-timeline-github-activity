import * as React from 'react';
import block from 'bem-cn';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import './index.scss';

export const className = block('options');

const styles = theme => ({
  root: {
    width: '50%',
    display: 'flex'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

function Options ({ children, perPage, onChange }) {
  console.log(perPage)
  return (
    <div className={className()}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={className('panel').toString()}>Additional settings for displaying activities</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {children}
    </div>
  );
}

export default withStyles(styles)(Options);