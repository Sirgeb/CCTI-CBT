import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class SubmitDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    this.props.submit();
  }

  render() {
    return (
      <div>
        <Button color="inherit" onClick={this.handleClickOpen} style={{ margin: 14 }}>Submit Test</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Do you want to submit?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Submitting will automatically end your test, Continue by clicking on <strong> Submit </strong> if you're done.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Don't Submit
            </Button>
            <Button onClick={this.handleSubmit} color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default SubmitDialog;
