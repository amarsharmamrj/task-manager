import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    props.setDialog(true)
  };

  const handleClose = () => {
    props.setDialog(false)
  };

  const handleConfirmDelete = () => {
    props.setConfirmDelete(true)
    props.setDialog(false)
    console.log("deleted")
  };

  return (
    <div>
      <Dialog
        open={props.dialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Are you sure to delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Once this task is deleted, cannot be recovered!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            CANCEL
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="secondary">
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
