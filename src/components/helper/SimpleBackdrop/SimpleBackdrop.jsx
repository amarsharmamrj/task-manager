import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function SimpleBackdrop(props) {
  const classes = useStyles();
  const handleClose = () => {
    props.setBackdrop(false);
  };
  // const handleToggle = () => {
  //   props.setBackdrop(!props.backdrop);
  // };

  return (
    <div>
      <Backdrop className={classes.backdrop} open={props.backdrop} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
