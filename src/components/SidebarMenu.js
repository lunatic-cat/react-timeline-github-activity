import React from "react";
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { styles } from './styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import List from '@material-ui/core/List';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import * as consts from './consts';


function MiniDrawer(props) {
  const { classes, startDate } = props;
  const currentDate = moment(startDate);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: props.open,
            [classes.drawerClose]: !props.open,
          }),
        }}
        open={props.open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={props.toggleSidebarMenu}>
            {!props.open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={!props.open ? props.toggleSidebarMenu : null}>
            <ListItemIcon className={classes.listIcon} ><CalendarTodayIcon /></ListItemIcon>
            <ListItemText primary={
              <DateTimePicker
                label={consts.datePickerLabel}
                value={currentDate}
                onChange={props.onChangeDate}
                showTodayButton={true}
              />
            } />
          </ListItem>
        </List>

      </Drawer>
    </MuiPickersUtilsProvider>
  );
}

export default withStyles(styles, { withTheme: true })(MiniDrawer);
