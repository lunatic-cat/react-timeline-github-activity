import React from 'react';
import Grid from '@material-ui/core/Grid';
import SnackbarContent  from '@material-ui/core/SnackbarContent';
import { className } from '../../../App';

export default function pushEventLine(props) {
    const { item } = props;
    return (
        <Grid container justify="flex-end" spacing={16}>
            <Grid item xs={12} sm={12}>
                <Grid item xs={8} sm={8} className={ className('commits', 'sha').toString() }>
                { item.sha }
                </Grid>
            <Grid item xs={12}  sm={12}>
                <SnackbarContent message = { item.message } />
            </Grid>
            </Grid>
        </Grid>
    )
  }