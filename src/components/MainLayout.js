import React from 'react';
import Timeline from '../containers/Timeline';
import Drawer from '../containers/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

function MainLayout(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: props.drawerOpen,
        })}
      >
        <div></div>
      </AppBar>
      <Drawer />
      <main className={classes.content}>
        <Timeline />
      </main>
    </div>
  );
};

export default withStyles(styles)(MainLayout);