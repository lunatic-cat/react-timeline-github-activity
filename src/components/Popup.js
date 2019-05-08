import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function InitialPopup(props) {
  function handleClickOpen() {
    props.togglePopup(true);
  }

  function handleClose() {
    if (props.organizationName) {
        saveOrganization()
        props.togglePopup(false);
    }
  }

  function saveOrganization() {
    props.onChangeOrg(props.organizationName);
  }

  return (
    <div>
      <Dialog open={props.popupOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter organization name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your organization name. For example: lunatic-cat.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Github organization name"
            type="text"
            onChange={ e => props.onChangeOrgName(e.target.value) }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default InitialPopup;